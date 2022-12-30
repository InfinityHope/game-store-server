import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { UserModel } from '../user/user.model'
import { ProductModel } from '../product/product.model'
import { CartItem, CreateOrderDto } from './dto/create-order.dto'
import { Types } from 'mongoose'

@Injectable()
export class OrderService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		@InjectModel(ProductModel)
		private readonly productModel: ModelType<ProductModel>
	) {}

	async returnOrderFields(arr) {
		return arr.map((item) => {
			return {
				date: item.date,
				productId: item.productId._id,
				title: item.productId.title,
				img: item.productId.img,
				price: item.productId.price,
				licenseKey: item.licenseKey
			}
		})
	}

	async createOrder(dto: CreateOrderDto) {
		const user = await this.userModel.findOne({ _id: dto.userId })
		let products = await this.productModel.find({
			_id: { $in: dto.cartItems.map((item) => item.productId) }
		})

		const clonedProducts = [...products]

		const UpdateProducts = async (
			product: ProductModel,
			licenseKey: string,
			item: CartItem,
			numberOfSales: number
		) => {
			await this.productModel.findByIdAndUpdate(
				{ _id: item.productId },
				{
					availability: product.licenseKeys.length > 1,
					licenseKeys: product.licenseKeys.filter(
						(item) => item !== licenseKey
					),
					numberOfSales: ++numberOfSales
				}
			)
		}

		const orders = dto.cartItems.map((item, index) => {
			let licenseKey =
				clonedProducts[index].licenseKeys[
					Math.floor(Math.random() * clonedProducts[index].licenseKeys.length)
				]
			if (!licenseKey) {
				throw new BadRequestException('Товара нет в наличии')
			}
			UpdateProducts(
				products[index],
				licenseKey,
				item,
				products[index].numberOfSales
			)
			if (!user.library.includes(products[index]._id)) {
				user.library.push(...clonedProducts)
			}
			return {
				date: Date.now(),
				productId: new Types.ObjectId(item.productId),
				licenseKey
			}
		})

		user.orders = [...user.orders, ...orders]

		user.save()

		return orders
	}

	async gerOrders(_id: string) {
		const user = await this.userModel
			.findById(_id)
			.populate('orders.productId')
			.exec()
		console.log(_id)
		return this.returnOrderFields(user.orders)
	}
}
