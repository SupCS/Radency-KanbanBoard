import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { Board } from '../board/board.entity';

@Entity()
export class TaskList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Board, board => board.taskLists)
  board: Board;

  @OneToMany(() => Task, task => task.taskList)
  tasks: Task[];
}
