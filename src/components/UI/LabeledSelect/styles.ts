import Select, { StylesConfig } from 'react-select';
import styled, { css } from 'styled-components';

export const multiselectStyle: StylesConfig = {
	menu: (provided: any) => ({ ...provided, zIndex: 4 }),
	menuList: (provided: any) => ({ ...provided, maxHeight: 148 }),
	option: (provided: any, state: any) => ({
		...provided,
		// eslint-disable-next-line no-nested-ternary
		backgroundColor: state.isSelected ? '#E91E63' : state.isFocused ? '#eee' : 'transparent',
		'&:active': {
			backgroundColor: '#eee',
			color: 'black',
		},
	}),
	control: (provided: any, { isFocused }: { isFocused: boolean }) => ({
		...provided,
		height: '56px',
		paddingLeft: isFocused ? 0 : '1px',
		paddingRight: isFocused ? 0 : '1px',
		backgroundColor: 'transparent',
		boxShadow: 0,
		borderWidth: isFocused ? '2px' : '1px',
		borderColor: isFocused ? '#3F51B5' : '#c4c4c4',
		'&:hover': {
			borderColor: isFocused ? '#3F51B5' : '#212121',
		},
	}),
	noOptionsMessage: (provided: any) => ({
		...provided,
		visibility: 'hidden',
		height: '31px',
		overflow: 'hidden',
		'&:before': {
			content: '"brak opcji"',
			visibility: 'visible',
			display: 'block',
			margin: 0,
			padding: 0,
		},
	}),
	placeholder: (provided: any) => ({
		...provided,
		height: '31px',
		overflow: 'hidden',
		visibility: 'hidden',
		'&:before': {
			content: '"wybierz..."',
			fontSize: '16px',
			visibility: 'visible',
			display: 'block',
			margin: 0,
			padding: '6px 0 0 0',
			height: '20px',
		},
	}),
};

export const StyledLabeledSelect = styled.fieldset<{
	margin: boolean;
	width?: number;
}>`
	position: relative;
	display: inline-block;
	margin: 0;
	padding: 0;
	border: 0;
	${({ margin }: { margin: boolean }) =>
		margin &&
		css`
			display: inline-block;
			margin-bottom: 8px;
			margin-top: 16px;
		`}
	width: 100%;
	${({ width }) =>
		width &&
		css`
			width: ${width}px;
		`}
`;

export const StyledLabel = styled.label`
	position: absolute;
	z-index: 1;
	top: -6px;
	left: 10px;
	display: inline-block;
	background: white;
	padding: 0 5px;
	font-size: 12px;
	border: 0;
	color: #757575;
	user-select: none;
	${({ active }: { active: any }) =>
		active &&
		css`
			color: #3f51b5;
		`}
`;

export const StyledSelect = styled(Select)`
	user-select: none;
`;
