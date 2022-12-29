import { prop, Ref } from '@typegoose/typegoose'
import { ProductModel } from '../product/product.model'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class OrderModel extends TimeStamps {
	@prop()
	date: number
	@prop({ ref: () => ProductModel })
	productId: Ref<ProductModel>
	@prop()
	licenseKey: string
}
