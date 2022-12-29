import { ConfigService } from '@nestjs/config'
import { TypegooseModuleOptions } from 'nestjs-typegoose'

export const getMongoConfig = async (
	configService: ConfigService
): Promise<TypegooseModuleOptions> => {
	console.log(getMongoString(configService))
	return {
		uri: getMongoString(configService),
		...getMongoOptions()
	}
}

const getMongoString = (configService: ConfigService) =>
	'mongodb+srv://' +
	configService.get('MONGO_LOGIN') +
	':' +
	configService.get('MONGO_PASSWORD') +
	'@' +
	configService.get('MONGO_CLUSTER') +
	'.jyxxqob.mongodb.net/' +
	configService.get('MONGO_DATABASE') +
	'?retryWrites=true&w=majority'

const getMongoOptions = () => ({
	useNewUrlParser: true,
	useUnifiedTopology: true
})
