import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { BodyResponse } from 'src/common/dtos/body-response.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post("register")
    async register(@Body() dto: CreateUserDto) {
        const response: BodyResponse = {
            status: 200,
            error: false,
            errorMessage: undefined,
            data: undefined
        }
        const id = await this.authService.register(dto);
        response.data = { id: id };
        return response;
    }

    @Post("login")
    async login(@Body() dto: LoginDto) {
        const response: BodyResponse = {
            status: 200,
            error: false,
            errorMessage: undefined,
            data: undefined
        }
        const id = await this.authService.login(dto.email, dto.password);
        response.data = { id: id };
        return response;
    }
}