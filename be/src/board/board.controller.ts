import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @ApiOperation({ summary: 'Create board' })
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all boards' })
  async findAll(): Promise<Board[]> {
    const data = await this.boardService.findAll();
    if (!data) throw new InternalServerErrorException('error controller');
    return data;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one board' })
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update board' })
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete board' })
  remove(@Param('id') id: string) {
    return this.boardService.remove(id);
  }
}
