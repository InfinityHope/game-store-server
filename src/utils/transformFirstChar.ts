export const transformFirstChar = (str) => {
	if (!str) return str
	if (Array.isArray(str)) {
		return str.map((string) => string[0].toUpperCase() + string.slice(1))
	}
	return str[0].toUpperCase() + str.slice(1)
}
