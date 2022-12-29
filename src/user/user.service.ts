import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from './user.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { UpdateUserDto } from './dto/update-user.dto'
import { genSalt, hash } from 'bcryptjs'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
	) {}

	returnUserFields(user: UserModel) {
		return {
			email: user.email,
			firstName: user.firstName,
			nickName: user.nickName,
			totalGames: user.library.length
		}
	}

	async returnLibFields(arr) {
		return arr.map((item) => {
			return {
				productId: item._id,
				title: item.title,
				img: item.img
			}
		})
	}

	async getUserData(_id: string) {
		const user = await this.userModel.findById(_id)
		return this.returnUserFields(user)
	}

	async updateUserData(_id: string, dto: UpdateUserDto) {
		const user = await this.userModel.findById(_id)
		const isSameUser = await this.userModel.findOne({ email: dto.email })

		if (isSameUser && _id !== String(isSameUser._id))
			throw new NotFoundException('Email занят')

		if (dto.password) {
			const salt = await genSalt(10)
			user.passwordHash = await hash(dto.password, salt)
		}
		user.email = dto.email
		user.firstName = dto.firstName
		user.nickName = dto.nickName

		await user.save()
		return {
			nickName: dto.nickName,
			firstName: dto.firstName,
			email: dto.email,
			password: dto.password
		}
	}

	async getLibrary(_id: string) {
		const user = await this.userModel
			.findOne({ _id: _id })
			.populate('library')
			.exec()
		return this.returnLibFields(user.library)
	}
}
