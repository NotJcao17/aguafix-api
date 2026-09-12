import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService
    ) {}

    async register(dto: CreateUserDto) {
        const id = await this.usersService.create(dto);
        return id;
    }

    async login(email: string, password: string) {
        const id = await this.usersService.validate(email, password);
        if (id === null) {
            throw new BadRequestException("Email o contraseña incorrectos");
        }
        return id;
    }
}