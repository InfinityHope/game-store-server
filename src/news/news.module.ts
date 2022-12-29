import { Module } from '@nestjs/common'
import { NewsService } from './news.service'
import { NewsController } from './news.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { NewsModel } from './news.model'

@Module({
	controllers: [NewsController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: NewsModel,
				schemaOptions: {
					collection: 'News'
				}
			}
		])
	],
	providers: [NewsService]
})
export class NewsModule {}
