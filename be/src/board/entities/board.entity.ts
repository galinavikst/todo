import { Task } from 'src/task/entities/task.entity';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryColumn({ nullable: false }) // primary unique by default
  id: string;

  //   name: string

  //   @OneToMany(() => Task, (task) => task.board, { cascade: true })
  //   tasks: Task[];
}
