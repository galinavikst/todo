import { Board } from 'src/board/entities/board.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  title: string;

  @Column()
  status: string;

  // @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'boardId' }) // Join with the boardId column
  // board: Board; // Reference to Board entitie

  @Column()
  boardId: string;
  @ManyToOne(() => Board, { cascade: ['remove'] })
  @JoinColumn({ name: 'boardId' }) // Join with the boardId column
  board: Board; // Reference to Board entitie
}
