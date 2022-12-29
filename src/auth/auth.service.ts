import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from '../user/user.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { JwtService } from '@nestjs/jwt'
import { AuthDto } from './dto/auth.dto'
import { compare, genSalt, hash } from 'bcryptjs'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		private readonly jwtService: JwtService
	) {}

	async login(dto: AuthDto) {
		console.log(dto)
		const user = await this.validateUser(dto)
		const token = await this.issueTokenPair(String(user._id))

		return {
			user: this.returnUserFields(user),
			token
		}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.userModel.findOne({ email: dto.email })
		const salt = await genSalt(10)
		if (oldUser)
			throw new BadRequestException('Такой пользователь уже существует')

		const newUser = new this.userModel({
			email: dto.email,
			passwordHash: await hash(dto.password, salt),
			firstName: dto.firstName,
			nickName: dto.nickName
		})

		const user = await newUser.save()
		const token = await this.issueTokenPair(String(user._id))

		return {
			user: this.returnUserFields(user),
			token
		}
	}

	async validateUser(dto: AuthDto) {
		const user = await this.userModel.findOne({ email: dto.email })
		if (!user) {
			throw new UnauthorizedException('User not found')
		}
		const isValidPass = await compare(dto.password, user.passwordHash)
		if (!isValidPass) {
			throw new UnauthorizedException('Password is not correct')
		}
		return user
	}

	async issueTokenPair(_id: string) {
		const data = { _id }
		const accessToken = this.jwtService.signAsync(data, {
			expiresIn: '10d'
		})
		return accessToken
	}

	returnUserFields(user: UserModel) {
		return {
			_id: user._id,
			email: user.email
		}
	}
}
