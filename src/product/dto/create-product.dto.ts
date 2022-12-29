import {
	IsArray,
	IsBoolean,
	IsNumber,
	IsOptional,
	IsString
} from 'class-validator'
import { Type } from 'class-transformer'

class RequirementDto {
	@IsString()
	os: string
	@IsString()
	processor: string
	@IsNumber()
	ram: number
	@IsString()
	videoCard: string
	@IsString()
	directX: string
	@IsString()
	@IsOptional()
	network?: string
	@IsNumber()
	diskStorage: number
	@IsString()
	@IsOptional()
	soundCard?: string
}

class RequirementsDto {
	@Type(() => RequirementDto)
	minimal: RequirementDto
	@Type(() => RequirementDto)
	recommended: RequirementDto
}

class DescriptionDto {
	@IsString()
	title: string
	@IsString()
	text: string
}

export class CreateProductDto {
	@IsString()
	title: string
	@IsString()
	img: string
	@IsString()
	releaseDate: string
	@IsNumber()
	price: number
	@IsString()
	developer: string
	@IsString()
	publisher: string
	@IsArray()
	@IsString({ each: true })
	genre: string[]
	@Type(() => RequirementsDto)
	requirements: RequirementsDto
	@Type(() => DescriptionDto)
	description: DescriptionDto
	@IsArray()
	@IsString({ each: true })
	licenseKeys: string[]
	@IsBoolean()
	toSlider: boolean
}
