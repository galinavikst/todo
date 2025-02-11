import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardsRepo: Repository<Board>,
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
      throw new Error(error);
    }
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    try {
      return await this.boardsRepo.save({ ...updateBoardDto, id });
    } catch (error) {
      console.log('update boardService', error);
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<string> {
    const res = await this.boardsRepo.delete(id);
    console.log(res);
    if (res.affected) return JSON.stringify(id);
    else throw new InternalServerErrorException('remove board error');
  }
}
