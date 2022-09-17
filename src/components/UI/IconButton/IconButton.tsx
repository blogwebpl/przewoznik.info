import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<{
	edge: string;
	marginLeft: string;
	marginRight: string;
	color: string;
	darkBg: boolean;
	disabled: boolean;
}>`
	background-color: transparent;
	border: 0;
	border-radius: 50%;
	color: ${(props) => props.color};
	cursor: pointer;
	display: flex;
	margin-bottom: 0;
	margin-left: ${({ edge, marginLeft }) => (edge === 'start' ? '-12px' : marginLeft)};
	margin-right: ${({ edge, marginRight }) => (edge === 'end' ? '-12px' : marginRight)};
	margin-top: 0;
	outline: 0;
	padding: 12px;
	position: relative;
	&:hover,
	&:focus {
		background-color: ${(props) => {
			if (!props.darkBg) return `${props.color}${props.theme.actions.hover}`;
			return `#777777${props.theme.actions.hover}`;
		}};
	}
	&:active {
		background-color: ${(props) => {
			if (!props.darkBg) return `${props.color}${props.theme.actions.active}`;
			return `#777777${props.theme.actions.active}`;
		}};
	}
	&:before {
		background: #7e7e7e;
		border-radius: 7%;
		color: #eee;
		content: '' attr(data-label) '';
		font-size: 10px;
		left: 50%;
		opacity: 0;
		padding: 4px 5px;
		position: absolute;
		scale: 0;
		text-align: center;
		top: -28px;
		transform: translate(-50%) scale(0);
		transition: all 0.1s linear;
		visibility: hidden;
	}
	&[data-label='']:before {
		display: none;
	}
	&:not([disabled]):hover:before {
		opacity: 0.9;
		transform: translate(-50%) scale(1);
		visibility: visible;
	}
	&:disabled {
		color: #ccc;
		background-color: transparent;
	}
`;

interface IconButtonProps {
	children: React.ReactChild;
	edge?: string;
	marginLeft?: string;
	marginRight?: string;
	color?: string;
	onClick?: any;
	darkBg?: boolean;
	label?: string;
	disabled?: boolean;
	id?: string;
}

export function IconButton({
	children,
	edge = '',
	marginLeft = '',
	marginRight = '',
	onClick = (event: any) => {
		event.preventDefault();
	},
	color = '#ffffff',
	darkBg = false,
	label = '',
	disabled = false,
	id,
}: IconButtonProps) {
	return (
		<StyledButton
			edge={edge}
			marginLeft={marginLeft}
			marginRight={marginRight}
			onClick={onClick}
			color={color}
			darkBg={darkBg}
			data-label={label}
			disabled={disabled}
			id={id}
		>
			{children}
		</StyledButton>
	);
}
