import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskList } from './task-list.entity';
import { Task } from '../tasks/task.entity';
import { ActivityLogService } from '../activity-log/activity-log.service';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>, 
    private activityLogService: ActivityLogService
  ) {}

  async create(name: string, boardId: number): Promise<TaskList> {
    const taskList = this.taskListRepository.create({ name, board: { id: boardId } });
    const savedTaskList = await this.taskListRepository.save(taskList);

    await this.activityLogService.logEvent('create_list', `List '${savedTaskList.name}' was created.`, null, savedTaskList.id, boardId);


    return savedTaskList;
  }

  async findAll(boardId: number): Promise<TaskList[]> {
    return this.taskListRepository.find({
      where: { board: { id: boardId } },
      relations: ['tasks', 'board'],
      order: { id: 'ASC' },
  });
  }

  async findOne(id: number): Promise<TaskList> {
    const taskList = await this.taskListRepository.findOneBy({ id });
    if (!taskList) {
      throw new NotFoundException(`TaskList with ID ${id} not found`);
    }
    return taskList;
  }

  async remove(id: number): Promise<void> {
    const taskList = await this.taskListRepository.findOne({
      where: { id },
      relations: ['board']
  });
    if (!taskList) {
      throw new NotFoundException(`TaskList with ID ${id} not found`);
    }
  
    await this.removeAllTasksInList(id);
    await this.taskListRepository.delete(id);
  
    if (taskList.board) {
      await this.activityLogService.logEvent(
        'delete_list',
        `List '${taskList.name}' (ID${id}) and all its tasks were deleted.`,
        null,
        id,
        taskList.board.id
      );
  } else {
      throw new Error(`Board is not found for TaskList with ID ${id}`);
  }
  }
  

  async removeAllTasksInList(taskListId: number): Promise<void> {
    await this.tasksRepository.delete({ taskList: { id: taskListId } });
  }

  async removeAllForBoard(boardId: number): Promise<void> {
    const taskLists = await this.taskListRepository.find({
        where: { board: { id: boardId } },
    });

    for (const list of taskLists) {
        await this.removeAllTasksInList(list.id);
    }

    await this.taskListRepository.remove(taskLists);
}

  async update(id: number, newName: string): Promise<TaskList> {
    const taskList = await this.taskListRepository.findOne({
      where: { id },
      relations: ['board']
  });
    if (!taskList) {
      throw new NotFoundException(`TaskList with ID ${id} not found`);
    }
  
    const oldName = taskList.name;
    if (oldName !== newName) {
      taskList.name = newName;
      await this.taskListRepository.save(taskList);
  
      await this.activityLogService.logEvent(
        'update_list',
        `List '${oldName}' (ID${id}) was renamed to '${newName}'.`,
        null,
        id,
        taskList.board.id
      );
    }
    return taskList;
  }
  
}
