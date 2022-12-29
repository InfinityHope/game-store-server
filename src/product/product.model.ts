import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose'

class Requirement {
	@prop()
	os: string
	@prop()
	processor: string
	@prop()
	ram: number
	@prop()
	videoCard: string
	@prop()
	directX: string
	@prop()
	network?: string
	@prop()
	diskStorage: number
	@prop()
	soundCard?: string
}

class Requirements {
	@prop({ type: () => Requirement, _id: false })
	minimal: Requirement
	@prop({ type: () => Requirement, _id: false })
	recommended: Requirement
}

class Description {
	@prop()
	title: string
	@prop()
	text: string
}

export interface ProductModel extends Base {}
export class ProductModel extends TimeStamps {
	@prop()
	title: string
	@prop()
	img: string
	@prop({ default: true })
	availability: boolean
	@prop()
	releaseDate: Date
	@prop()
	price: number
	@prop()
	developer: string
	@prop()
	publisher: string
	@prop({ type: () => [String] })
	genre: string[]
	@prop({ type: () => Requirements, _id: false })
	requirements: Requirements
	@prop({ type: () => Description, _id: false })
	description: Description
	@prop()
	language: string
	@prop()
	regionActivation: string
	@prop()
	serviceActivation: string
	@prop({ type: () => [String] })
	screenShots: string[]
	@prop({ type: () => [String] })
	licenseKeys: string[]
	@prop({ default: 0 })
	numberOfSales: number
	@prop()
	toSlider: boolean
	@prop()
	sliderImg: string
}
