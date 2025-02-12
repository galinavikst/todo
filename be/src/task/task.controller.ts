import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create task' })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  async findAll() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one task' })
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Get('/board/:boardId')
  @ApiOperation({ summary: 'Get all board tasks' })
  async getTasksByBoard(@Param('boardId') boardId: string) {
    return this.taskService.getTasksByBoardId(boardId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task' })
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task' })
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
