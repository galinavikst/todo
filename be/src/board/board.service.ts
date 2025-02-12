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
      console.log('findAll boardService', error);
      throw new InternalServerErrorException('Failed to fetch boards');
    }
  }

  async findOne(id: string): Promise<Board> {
    try {
      const data = await this.boardsRepo.findOneBy({ id });
      if (!data) throw new NotFoundException('board not found');
      return data;
    } catch (error) {
      console.log('findOne boardService', id, error);
      throw error;
    }
  }

  async update(oldId: string, updateBoardDto: UpdateBoardDto) {
    try {
      const newBoard = await this.create({ id: updateBoardDto.id as string });
      if (newBoard) {
        await this.tasksRepo.update(
          { boardId: oldId },
          { boardId: updateBoardDto.id },
        );
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
