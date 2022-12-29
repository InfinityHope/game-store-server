import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { NewsModel } from './news.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { CreateNewsDto } from './dto/create-news.dto'

@Injectable()
export class NewsService {
	constructor(
		@InjectModel(NewsModel) private readonly newsModel: ModelType<NewsModel>
	) {}

	async createNewsItem(dto: CreateNewsDto) {
		return this.newsModel.create(dto)
	}

	async getNews() {
		return this.newsModel.find()
	}

	async getNewsItem(_id: string) {
		return this.newsModel.findByIdAndUpdate(
			_id,
			{
				$inc: {
					views: 1
				}
			},
			{ new: true }
		)
	}

	async updateNewsItem(_id: string, dto: CreateNewsDto) {
		return this.newsModel.findByIdAndUpdate(_id, dto, { new: true }).exec()
	}
}
