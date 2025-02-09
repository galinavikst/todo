import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  create(createBoardDto: CreateBoardDto) {
    return 'This action adds a new board';
  }

  findAll(): Promise<Board[]> {
    return this.boardsRepository.find();
    //return `This action returns all board`;
  }

  findOne(id: string): Promise<Board | null> {
    return this.boardsRepository.findOneBy({ id });
    //return `This action returns a #${id} board`;
  }

  update(id: string, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  async remove(id: string): Promise<void> {
    await this.boardsRepository.delete(id);
    //return `This action removes a #${id} board`;
  }
}
