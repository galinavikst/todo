import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryColumn({ nullable: false }) // primary unique by default
  id: string;

  //   @OneToMany(() => Task, (task) => task.board, { cascade: true })
  //   tasks: Task[];
}
