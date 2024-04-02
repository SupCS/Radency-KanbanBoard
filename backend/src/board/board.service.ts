import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { TaskListService } from '../task-list/task-list.service';
import { ActivityLogService } from 'src/activity-log/activity-log.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    private taskListService: TaskListService,
    private activityLogService: ActivityLogService
  ) {}

  async create(name: string): Promise<Board> {
    const board = this.boardRepository.create({ name });
    const savedBoard = await this.boardRepository.save(board);
    await this.activityLogService.logEvent(
      'create_board',
      `Board '${savedBoard.name}' was created.`,
      null,
      null,
      savedBoard.id
    );
    return savedBoard;
  }

  async findAll(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async findOne(id: number): Promise<Board> {
    const board = await this.boardRepository.findOneBy({ id });
    if (!board) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }
    return board;
  }

  async update(id: number, name: string): Promise<Board> {
    const board = await this.findOne(id);
    const oldName = board.name;
    if (oldName !== name) {
        board.name = name;
        const updatedBoard = await this.boardRepository.save(board);
    
        await this.activityLogService.logEvent(
          'rename_board',
          `Board '${oldName}' was renamed to '${name}'.`,
          null,
          null,
          updatedBoard.id
        );
    
        return updatedBoard;
      } else {
        return board;
      }
    }
  async remove(id: number): Promise<void> {
    await this.activityLogService.clearLogsForBoard(id);
    await this.taskListService.removeAllForBoard(id);

    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`Board with ID "${id}" not found`);
    }
}
}
