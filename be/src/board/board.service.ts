import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { Task } from 'src/task/entities/task.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardsRepo: Repository<Board>,
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const boards = await this.findAll();
    if (boards.some((board) => board.id === createBoardDto.id))
      throw new BadRequestException(`${createBoardDto.id} board alredy exist`);

    try {
      const newBoard = this.boardsRepo.create({
        id: createBoardDto.id,
      });
      const response = await this.boardsRepo.save(newBoard);
      console.log(response, 'response add');

      return response;
    } catch (error) {
      console.log('create boardService', error);
      throw error;
    }
  }

  async findAll(): Promise<Board[]> {
    try {
      const data = await this.boardsRepo.find();
      return data;
    } catch (error) {
      console.log('findAll board error', error);
      throw new InternalServerErrorException('Failed to fetch boards');
    }
  }

  async findOne(id: string): Promise<Board | null> {
    try {
      const data = await this.boardsRepo.findOneBy({ id });
      return data;
    } catch (error) {
      console.log('findOne board error', id, error);
      throw new NotFoundException('board not found');
    }
  }

  async update(oldId: string, updateBoardDto: UpdateBoardDto) {
    try {
      const newBoard = await this.create({ id: updateBoardDto.id as string });
      console.log(newBoard);

      await this.tasksRepo.update(
        { boardId: oldId },
        { boardId: updateBoardDto.id },
      );

      if (newBoard) {
        await this.remove(oldId);
        return newBoard;
      }
    } catch (error) {
      console.log('update boardService', error);
      throw error;
    }
  }

  async remove(id: string): Promise<string> {
    const res = await this.boardsRepo.delete(id);
    console.log(res);
    if (res.affected) return JSON.stringify(id);
    else throw new InternalServerErrorException('remove board error');
  }
}
