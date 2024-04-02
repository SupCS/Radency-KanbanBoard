import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Board } from '../board/board.entity';

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column()
  action: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  taskId: number;

  @Column({ nullable: true })
  taskListId: number;

  @Column({ nullable: true })
  boardId: number;

  @ManyToOne(() => Board)
  board: Board;
}
