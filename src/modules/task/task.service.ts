import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment-timezone';

@Injectable()
export class TaskService {
  @InjectRepository(TaskEntity)
  private readonly taskRepository: Repository<TaskEntity>;
  async create(
    createTaskDto: CreateTaskDto,
    user_id: string,
  ): Promise<TaskEntity> {
    return await this.taskRepository.save({
      ...createTaskDto,
      id: uuidv4(),
      user_id,
      created_at: moment().tz('America/Sao_Paulo').toDate(),
    });
  }

  async findAll(user_id: string): Promise<TaskEntity[]> {
    const tasks = await this.taskRepository.find({
      where: { user_id },
    });

    return tasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async remove(id: string) {
    return await this.taskRepository.delete(id);
  }
}
