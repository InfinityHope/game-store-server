import { IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
	@IsString()
	firstName: string
	@IsString()
	nickName: string
	@IsString()
	email: string
	@IsString()
	@IsOptional()
	password?: string
}
