import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { JwtAuthGuard } from '../guards/jwt.guard'

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@UseGuards(JwtAuthGuard)
	@Post('/create')
	async createOrder(@Body() dto: CreateOrderDto) {
		return this.orderService.createOrder(dto)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/:id')
	async getOrder(@Param('id') _id: string) {
		return this.orderService.gerOrders(_id)
	}
}
