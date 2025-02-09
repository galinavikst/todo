import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryColumn() // Auto-incremented primary key
  id: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  // @OneToMany(() => Task, (task) => task.boardId)
  // tasks: Task[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
