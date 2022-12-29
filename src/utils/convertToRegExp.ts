export const convertToRegExp = (value) => {
	return value.split(',').map((item) => new RegExp(item.toString(), 'i'))
}
