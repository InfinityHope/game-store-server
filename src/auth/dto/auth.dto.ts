import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail()
	email: string

	@MinLength(6, {
		message: 'Пароль не может быть меньше 6 символов'
	})
	@IsString()
	password: string

	@IsOptional()
	@IsString()
	firstName: string

	@IsOptional()
	@IsString()
	nickName: string
}
