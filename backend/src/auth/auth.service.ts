import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from '../users/users.entity'; 
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { user, email, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      user: user,
      email,
      password: hashedPassword,
    });
    await this.usersRepository.save(newUser);
    const payload = { email: newUser.email, sub: newUser.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      };
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  async refreshToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const payload = { email: decoded.email, sub: decoded.sub };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
