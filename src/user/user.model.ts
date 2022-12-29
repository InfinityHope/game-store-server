import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop, Ref } from '@typegoose/typegoose'
import { OrderModel } from '../order/order.model'
import { ProductModel } from '../product/product.model'

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
	@prop()
	firstName: string
	@prop()
	nickName: string
	@prop({ unique: true })
	email: string
	@prop()
	passwordHash: string
	@prop({ type: () => [OrderModel], default: {} })
	orders?: OrderModel[]
	@prop({ ref: () => ProductModel, _id: false })
	library?: Ref<ProductModel>[]
}
