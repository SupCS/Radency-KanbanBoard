import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './activity-log.entity';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLog)
    private readonly activityLogRepository: Repository<ActivityLog>,
  ) {}


    findAll(taskId?: number, taskListId?: number, boardId?: number): Promise<ActivityLog[]> {
    let queryBuilder = this.activityLogRepository.createQueryBuilder('activityLog');

    if (taskId) {
      queryBuilder = queryBuilder.andWhere('activityLog.taskId = :taskId', { taskId });
    }

    if (taskListId) {
      queryBuilder = queryBuilder.andWhere('activityLog.taskListId = :taskListId', { taskListId });
    }

    if (boardId) {
      queryBuilder = queryBuilder.andWhere('activityLog.boardId = :boardId', { boardId });
    }
  

    return queryBuilder.getMany();
  }

  async logEvent(action: string, description: string, taskId?: number, taskListId?: number, boardId?: number): Promise<ActivityLog> {
    const logEntry = this.activityLogRepository.create({
      action,
      description,
      taskId,
      taskListId,
      boardId,
    });

    return this.activityLogRepository.save(logEntry);
  }

  async clearAll(): Promise<void> {
    await this.activityLogRepository.clear();
  }
  
  async clearLogsForBoard(boardId: number): Promise<void> {
    await this.activityLogRepository
      .createQueryBuilder()
      .delete()
      .from(ActivityLog)
      .where("boardId = :boardId", { boardId })
      .execute();
  }
}
