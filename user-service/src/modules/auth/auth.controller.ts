import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from './guards/jwt.guard';

@Controller('test')
export class AuthController {
  @UseGuards(JwtGuard)
  @Get()
  execute() {
    return 'xd';
  }
}
