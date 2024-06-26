import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadRequestException(
        'Desculpe, este endereço de e-mail já está cadastrado em nosso sistema. Por favor, utilize outro endereço de e-mail para se cadastrar!',
      );
    }

    if (createUserDto.password.length < 6) {
      throw new BadRequestException(
        'A senha não pode ter menos que 6 caracteres.',
      );
    }

    const saltRandom = 10;
    const passwordHash = await hash(createUserDto.password, saltRandom);

    return await this.userRepository.save({
      ...createUserDto,
      id: uuidv4(),
      password: passwordHash,
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }
}
