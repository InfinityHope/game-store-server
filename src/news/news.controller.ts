import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { NewsService } from './news.service'
import { CreateNewsDto } from './dto/create-news.dto'

@Controller('news')
export class NewsController {
	constructor(private readonly newsService: NewsService) {}

	@Get()
	async getNews() {
		return this.newsService.getNews()
	}

	@Get(':id')
	async getNewsItem(@Param('id') _id: string) {
		return this.newsService.getNewsItem(_id)
	}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async createNewsItem(@Body() dto: CreateNewsDto) {
		return this.newsService.createNewsItem(dto)
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async updateNews(@Param('id') _id: string, @Body() dto: CreateNewsDto) {
		return this.newsService.updateNewsItem(_id, dto)
	}
}
