export const sortProducts = (sort, products) => {
	switch (sort) {
		case 'priceAsc': {
			products.sort({
				price: 1
			})
			break
		}
		case 'priceDesc': {
			products.sort({
				price: -1
			})
			break
		}
		case 'titleAsc': {
			products.sort({
				title: 1
			})
			break
		}
		case 'popularityDesc': {
			products.sort({
				numberOfSales: -1
			})
			break
		}
	}
}
