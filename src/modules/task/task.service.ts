import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment-timezone';
import { UserEntity } from '../user/entities/user.entity';
import { returnTasks } from './dto/return-tasks.dto';

@Injectable()
export class TaskService {
  @InjectRepository(TaskEntity)
  private readonly taskRepository: Repository<TaskEntity>;

  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  async create(
    createTaskDto: CreateTaskDto,
    user_id: string,
  ): Promise<TaskEntity> {
    const user = await this.findUser(user_id);

    if (!user) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    }

    const task = await this.taskRepository.save({
      ...createTaskDto,
      id: uuidv4(),
      user_id,
      created_at: moment().tz('America/Sao_Paulo').toDate(),
    });

    return task;
  }

  async findAll(user_id: string): Promise<TaskEntity[]> {
    const user = await this.findUser(user_id);

    if (!user) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    }

    const tasks = await this.taskRepository.find({
      where: { user_id },
      select: ['id', 'title', 'description', 'created_at'],
    });

    return tasks;
  }

  /* ENDPOINT PARA CASO O USUARIO EXISTA */
  async findUser(user_id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    return user;
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
