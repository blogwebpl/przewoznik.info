import _ from 'lodash';

export default (data: any[], searchText: String) =>
	_.filter(data, (o) => {
		if (!searchText) {
			return true;
		}
		let show = false;
		Object.keys(o).forEach((key) => {
			if (key !== '_id' && !Array.isArray(o[key])) {
				const value = o[key] ? o[key].toString() : '';
				if (
					(searchText[0] === '!' && value.toUpperCase()) ===
					searchText.substring(1, searchText.length).toUpperCase()
				) {
					show = true;
				} else if (value.toUpperCase().includes(searchText.toUpperCase())) {
					show = true;
				}
			}
		});
		return show;
	});
