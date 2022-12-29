import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from '../guards/jwt.guard'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async getUserData(@Param('id') _id: string) {
		return this.userService.getUserData(_id)
	}

	@UseGuards(JwtAuthGuard)
	@Get('library/:id')
	async getLibrary(@Param('id') _id: string) {
		return this.userService.getLibrary(_id)
	}

	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async updateUserData(@Param('id') _id: string, @Body() dto: UpdateUserDto) {
		return this.userService.updateUserData(_id, dto)
	}
}
