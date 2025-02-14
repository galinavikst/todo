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

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const newTask = this.taskRepo.create(createTaskDto);
      const res = await this.taskRepo.save(newTask);
      return res;
    } catch (error) {
      console.log('create task service error', error);
      throw error;
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      return await this.taskRepo.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<Task> {
    try {
      const data = await this.taskRepo.findOneBy({ id });
      if (!data) throw new NotFoundException('task not found');
      return data;
    } catch (error) {
      console.log('findOne taskService', id, error);
      throw error;
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
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
