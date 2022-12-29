import { transformFirstChar } from './transformFirstChar'

export const setFilters = (options, filters) => {
	if (filters) {
		for (let key in filters) {
			switch (key) {
				case 'genre': {
					options = {
						...options,
						genre: { $in: transformFirstChar(filters[key].split(',')) }
					}
					break
				}
				case 'developer': {
					options = {
						...options,
						developer: { $in: transformFirstChar(filters[key].split(',')) }
					}
					break
				}
				case 'publisher': {
					options = {
						...options,
						publisher: { $in: transformFirstChar(filters[key].split(',')) }
					}
					break
				}
			}
		}
	}
	return options
}
