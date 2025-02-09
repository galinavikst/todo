import { Board } from 'src/board/entities/board.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryColumn() // Auto-incremented primary key
  id: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar' })
  boardId: string;
  @ManyToOne(() => Board) // (board) => board.tasks)
  @JoinColumn({ name: 'boardId' }) // Join with the boardId column
  board: string | null;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseInt(value),
    },
  })
  createdAt: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
