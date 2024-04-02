import { Controller, Get, Delete, Query } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { ActivityLog } from './activity-log.entity';

@Controller('activity-logs')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Get()
  getAll(
    @Query('boardId') boardId?: number,
    @Query('taskId') taskId?: number, 
    @Query('taskListId') taskListId?: number
  ): Promise<ActivityLog[]> {
    return this.activityLogService.findAll(taskId, taskListId, boardId);
  }
  

  @Delete()
  clearHistory(@Query('boardId') boardId?: number): Promise<void> {
      return this.activityLogService.clearLogsForBoard(boardId);
  }
}
