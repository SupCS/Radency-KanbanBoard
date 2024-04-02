import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TaskList } from '../task-list/task-list.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => TaskList, taskList => taskList.board, { cascade: true })
  taskLists: TaskList[];
}