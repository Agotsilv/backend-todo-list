import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { returnTasks } from './dto/return-tasks.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Tasks')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/:user_id')
  create(
    @Param('user_id') user_id: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.create(createTaskDto, user_id);
  }

  @Get('/:user_id')
  findAll(@Param('user_id') user_id: string): Promise<returnTasks[]> {
    return this.taskService.findAll(user_id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.taskService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   // return this.taskService.update(id, updateTaskDto);
  // }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
