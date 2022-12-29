import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { ProductModel } from '../product/product.model'
import { UserModel } from '../user/user.model'
import { OrderModel } from './order.model'

@Module({
	controllers: [OrderController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ProductModel,
				schemaOptions: {
					collection: 'Product'
				}
			}
		]),
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User'
				}
			}
		]),
		OrderModel
	],
	providers: [OrderService]
})
export class OrderModule {}
