import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.entity';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(@Body('name') name: string): Promise<Board> {
    return this.boardService.create(name);
  }

  @Get()
  findAll(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Board> {
    return this.boardService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('name') name: string): Promise<Board> {
    return this.boardService.update(id, name);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.boardService.remove(id);
  }
}
