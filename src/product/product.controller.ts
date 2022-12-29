import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { ProductModel } from './product.model'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async createProduct(@Body() dto: CreateProductDto): Promise<ProductModel> {
		return this.productService.create(dto)
	}

	@Get()
	async getAllProducts(@Req() req) {
		return this.productService.getProducts(req)
	}

	@Get('/toSlider')
	async getProductsToSlider() {
		return this.productService.getProductsToSlider()
	}

	@Get('/byReleaseDate')
	async getProductsByReleaseDate(@Query('limit') limit: number) {
		return this.productService.getProductsByReleaseDate(limit)
	}

	@Get('/bySales')
	async getProductsBySales(@Query('limit') limit: number) {
		return this.productService.getProductsBySales(limit)
	}

	@Get(':id')
	async findOneProduct(@Param('id') _id: string) {
		return this.productService.findOne(_id)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async deleteProduct(@Param('id') _id: string): Promise<ProductModel> {
		return this.productService.delete(_id)
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async updateProduct(
		@Param('id') _id: string,
		@Body() dto: CreateProductDto
	): Promise<ProductModel> {
		return this.productService.update(_id, dto)
	}
}
