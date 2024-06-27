import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { returnUser } from './dto/return-user.dto';
import { LoginPayload } from './dto/loginPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const user: UserEntity | undefined = await this.userService
      .findByEmail(loginAuthDto.email)
      .catch(() => undefined);

    const isMatch = await compare(loginAuthDto.password, user.password);

    if (!user || !isMatch) {
      throw new BadRequestException('Email ou senha inválidos!');
    }

    return {
      token: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new returnUser(user),
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
