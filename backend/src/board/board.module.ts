import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board } from './board.entity';
import { TaskListModule } from '../task-list/task-list.module';
import { ActivityLogModule } from '../activity-log/activity-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    TaskListModule,
    ActivityLogModule
],
  providers: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
