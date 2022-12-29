import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ProductModel } from './product.model'
import { CreateProductDto } from './dto/create-product.dto'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { setFilters } from '../utils/setFilters'
import { sortProducts } from '../utils/sortProducts'

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(ProductModel)
		private readonly productModel: ModelType<ProductModel>
	) {}

	returnProductsFields(products: ProductModel[]) {
		return products.map((product) => ({
			_id: product._id,
			title: product.title,
			releaseDate: product.releaseDate,
			img: product.img,
			price: product.price,
			developer: product.developer,
			publisher: product.publisher,
			genre: product.genre,
			sliderImg: product.sliderImg,
			numberOfSales: product.numberOfSales,
			regionActivation: product.regionActivation,
			serviceActivation: product.serviceActivation
		}))
	}

	async create(dto: CreateProductDto): Promise<ProductModel> {
		return this.productModel.create(dto)
	}

	async delete(_id: string): Promise<ProductModel> {
		const deletedProduct = await this.productModel.findOne({ _id })
		if (!deletedProduct) {
			throw new NotFoundException('Такой продукт не найден')
		}
		return deletedProduct.delete()
	}

	async getProductsToSlider() {
		const products = await this.productModel.find({ toSlider: true })
		return this.returnProductsFields(products)
	}

	async getProductsByReleaseDate(limit: number) {
		const products = await this.productModel
			.find({ releaseDate: { $gt: 0 } })
			.limit(limit)
			.sort({ releaseDate: -1 })
			.exec()

		return this.returnProductsFields(products)
	}

	async getProductsBySales(limit: number) {
		const products = await this.productModel
			.find({ numberOfSales: { $gt: 0 } })
			.limit(limit)
			.sort({ numberOfSales: -1 })
			.exec()

		return this.returnProductsFields(products)
	}

	async getProducts(req) {
		let { limit, page = 1, sort, search, ...filters } = req.query
		let options = {}

		if (search) {
			options = {
				$or: [
					{
						title: new RegExp(search, 'i')
					}
				]
			}
		}

		if (filters) {
			options = {
				...options,
				...setFilters(options, filters)
			}
		}

		const total = await this.productModel.count({
			...options,
			availability: true
		})

		const query = this.productModel.find({ ...options, availability: true })

		if (sort) {
			sortProducts(sort, query)
		}

		const products = await query.skip((page - 1) * limit).limit(limit)

		return {
			products: this.returnProductsFields(products),
			page,
			pages: Math.ceil(total / limit),
			total
		}
	}

	async findOne(_id: string) {
		const product: ProductModel = await this.productModel.findById(_id)
		if (!product) {
			throw new NotFoundException('Такой продукт не найден')
		}
		return {
			_id: product._id,
			title: product.title,
			price: product.price,
			availability: product.availability,
			img: product.img,
			developer: product.developer,
			publisher: product.publisher,
			description: product.description,
			releaseDate: product.releaseDate,
			requirements: product.requirements,
			language: product.language,
			regionActivation: product.regionActivation,
			serviceActivation: product.serviceActivation,
			screenShots: product.screenShots,
			genre: product.genre,
			numberOfSales: product.numberOfSales
		}
	}

	async update(_id: string, dto: CreateProductDto): Promise<ProductModel> {
		return this.productModel.findByIdAndUpdate(_id, dto, { new: true }).exec()
	}
}
