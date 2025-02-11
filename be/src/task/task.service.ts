import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = this.taskRepo.create(createTaskDto);
      const res = await this.taskRepo.save(newTask);
      console.log(res, 'res create task service');

      return res;
    } catch (error) {
      console.log('create task service error', error);
      throw error;
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      const tasks = await this.taskRepo.find();
      return tasks;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getTasksByBoardId(boardId: string): Promise<Task[]> {
    return await this.taskRepo.find({
      where: { boardId },
    });
  }

  async findOne(id: number): Promise<Task | null> {
    try {
      const data = await this.taskRepo.findOneBy({ id });
      return data;
    } catch (error) {
      console.log('findOne task error', id, error);
      throw new NotFoundException('task not found');
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
    const res = await this.taskRepo.update(id, updateTaskDto);
    if (res.affected) return await this.findOne(id);
    else throw new InternalServerErrorException();
  }

  async remove(id: number): Promise<DeleteResult | string> {
    const res = await this.taskRepo.delete(id);
    if (res.affected) return JSON.stringify(id);
    else throw new InternalServerErrorException('remove task error');
  }
}
