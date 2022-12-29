import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { getMongoConfig } from './config/mongo.config'
import { AuthModule } from './auth/auth.module'
import { ProductModule } from './product/product.module'
import { UserModule } from './user/user.module'
import { OrderModule } from './order/order.module'
import { NewsModule } from './news/news.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig
		}),
		AuthModule,
		ProductModule,
		UserModule,
		OrderModule,
		NewsModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
