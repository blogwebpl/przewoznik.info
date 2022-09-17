import _ from 'lodash';

import Column from '../components/UI/Table/ColumnInterface';

const ALPHABET = 'aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż';
const LETTERS = ALPHABET.split('')
	.map((letter) => `${letter}${letter.toUpperCase()}`)
	.join('');
const DIGITS = '0123456789';
const SPECIAL_CHARACTERS = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`}|{~';
const CHARACTERS = `${SPECIAL_CHARACTERS}${DIGITS}${LETTERS}`;

const comparator = (a: string, b: string) => {
	const aLength = a.length;
	const bLength = b.length;
	const maxIndexToCheck = Math.min(aLength, bLength);
	let index = 0;
	while (index < maxIndexToCheck && a[index] === b[index]) {
		index += 1;
	}
	index = Math.min(index, maxIndexToCheck);
	const aLastValue = CHARACTERS.indexOf(a[index]);
	const bLastValue = CHARACTERS.indexOf(b[index]);
	if (aLastValue < bLastValue) {
		return -1;
	}
	if (aLastValue > bLastValue) {
		return 1;
	}
	return bLength - aLength;
};

export default (data: any[], columns: Column[]) => {
	if (data.length === 0) {
		return [];
	}
	const dataLocal = [...data];
	const columnsSorted = _.orderBy(columns, ['sortOrder'], ['asc']);
	dataLocal.sort((a, b) => {
		let result = 0;
		columnsSorted.forEach((column) => {
			const sort = column.sort === 'asc';
			const { key, type } = column;
			let c = 0;
			if (type === 'number') {
				const ak = parseInt(a[key], 10);
				const bk = parseInt(b[key], 10);
				if (ak > bk) {
					c = 1;
				} else if (ak < bk) {
					c = -1;
				} else {
					c = 0;
				}
			} else if (a[key] && b[key]) {
				const ak = a[key].toString().toLowerCase();
				const bk = b[key].toString().toLowerCase();
				c = comparator(ak, bk);
			} else {
				c = 0;
			}
			if (result === 0) {
				result = sort ? c : -c;
			}
		});
		return result;
	});
	return dataLocal;
};
