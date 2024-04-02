import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskList } from '../task-list/task-list.entity';
import { ActivityLogService } from '../activity-log/activity-log.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>,
    private activityLogService: ActivityLogService
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { taskListId, ...taskData } = createTaskDto;
    const task = this.tasksRepository.create(taskData);
    let taskList;
    if (taskListId) {
      taskList = await this.taskListRepository.findOne({
        where: { id: taskListId },
        relations: ['board']
      });
      if (!taskList) {
        throw new NotFoundException(`TaskList with ID ${taskListId} not found`);
      }
      task.taskList = taskList;
    }
    const savedTask = await this.tasksRepository.save(task);
  
    await this.activityLogService.logEvent(
      'create',
      `Task '${savedTask.taskName}' was created in '${taskList.name}'`,
      savedTask.id,
      taskListId,
      taskList.board.id
    );
  
    return savedTask;
  }
  
  async update(id: number, updateTaskDto: Task): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['taskList', 'taskList.board']
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // на зрозумілі строки
    const keysToHumanReadable = {
      taskName: 'name',
      taskDescription: 'description',
      priority: 'priority',
      dueDate: 'due date',
    };

    // Зберігаємо старі значення для порівняння
    const oldValues = {
      taskName: task.taskName,
      taskDescription: task.taskDescription,
      priority: task.priority,
      dueDate: task.dueDate,
    };

    // Оновлюємо завдання
    this.tasksRepository.merge(task, updateTaskDto);
    const updatedTask = await this.tasksRepository.save(task);

    // Визначаємо, що змінилося
    const changes = Object.keys(oldValues).filter(
      (key) => oldValues[key] !== updatedTask[key]
    ).map((key) => keysToHumanReadable[key]);

    // Логуємо зміни
    const boardId = task.taskList && task.taskList.board ? task.taskList.board.id : undefined;
    if (changes.length > 0) {
      const changesText = changes.join(', ');
      await this.activityLogService.logEvent(
        'update_task',
        `Task '${task.taskName}' (ID${id}) had its ${changesText} updated.`,
        task.id,
        task.taskList ? task.taskList.id : undefined,
        boardId
      );
    }

    return updatedTask;
  }
  

  async remove(id: number): Promise<void> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['taskList', 'taskList.board']
    });
  
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  
    const boardId = task.taskList && task.taskList.board ? task.taskList.board.id : undefined;
  
    await this.tasksRepository.delete(id);
  
    await this.activityLogService.logEvent(
      'delete_task',
      `Task '${task.taskName}' was deleted from '${task.taskList ? task.taskList.name : 'Unknown List'}'.`,
      id,
      task.taskList ? task.taskList.id : undefined,
      boardId
    );
  }
  async move(id: number, taskListId: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['taskList', 'taskList.board']
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

  const newTaskList = await this.taskListRepository.findOne({
    where: { id: taskListId },
    relations: ['board']
  });

  if (!newTaskList) {
    throw new NotFoundException(`TaskList with ID ${taskListId} not found`);
  }

  task.taskList = newTaskList;
  await this.tasksRepository.save(task);

  await this.activityLogService.logEvent(
    'move_task',
    `Task '${task.taskName}' was moved to list '${newTaskList.name}' (ID${taskListId}).`,
    task.id,
    taskListId,
    newTaskList.board.id
  );

  return task;
}
}