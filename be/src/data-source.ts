import { DataSource } from 'typeorm';
import { Board } from './board/entities/board.entity';
import 'dotenv/config';
import { Task } from './task/entities/task.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [Board, Task],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
