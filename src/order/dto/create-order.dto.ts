export class CartItem {
	productId: string
	title: string
	price: string
}

export class CreateOrderDto {
	cartItems: CartItem[]
	userId: string
}
