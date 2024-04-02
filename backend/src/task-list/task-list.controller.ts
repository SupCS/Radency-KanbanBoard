import { Body, Controller, Get, Post, Put, Delete, Param, Query} from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { TaskList } from './task-list.entity';

@Controller('task-lists')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Post()
  async create(@Body('name') name: string, @Body('boardId') boardId: number): Promise<TaskList> {
    return this.taskListService.create(name, boardId);
  }

  @Get()
  findAll(@Query('boardId') boardId: number): Promise<TaskList[]> {
    return this.taskListService.findAll(boardId);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<TaskList> {
    return this.taskListService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('name') name: string): Promise<TaskList> {
    return this.taskListService.update(id, name);
  }


  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.taskListService.remove(id);
  }
}
