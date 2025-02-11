import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  boardId: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  title: string;
}
