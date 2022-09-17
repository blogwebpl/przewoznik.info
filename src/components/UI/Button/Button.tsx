import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button<{
	isMargin?: boolean;
	width?: number;
	secondary?: boolean;
}>`
	align-items: center;
	background-color: ${(props) => props.theme.palette.primary.main};
	${({ secondary }) =>
		secondary &&
		css`
			background-color: ${(props) => props.theme.palette.secondary.main};
		`}
	border-radius: ${(props) => props.theme.shape.borderRadious};
	border-width: 0;
	box-shadow: ${(props) => props.theme.shadows[3]};
	color: ${(props) => props.theme.palette.primary.defaultText};
	display: inline-flex;
	font-size: 1em;
	height: 36px;
	justify-content: center;
	outline-offset: 2px;
	padding: 0 16px;
	width: 100%;
	${({ isMargin }) =>
		isMargin &&
		css`
			margin-left: 16px;
		`}
	${({ width }) =>
		width &&
		css`
			width: ${width}px;
		`}
	&:active {
		background-color: ${(props) => props.theme.palette.primary.dark};
		${({ secondary }) =>
			secondary &&
			css`
				background-color: ${(props) => props.theme.palette.secondary.dark};
			`}
	}
	&:disabled {
		filter: grayscale(100%);
	}
`;

interface ButtonProps {
	label: string;
	onClick?: any;
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset' | undefined;
	id?: string;
	width?: number;
	isMargin?: boolean;
	secondary?: boolean;
	tabIndex?: number | undefined;
}

export function Button({
	label,
	onClick,
	disabled,
	type,
	id,
	width,
	isMargin = false,
	secondary = false,
	tabIndex = undefined,
}: ButtonProps) {
	return (
		<StyledButton
			onClick={onClick}
			disabled={disabled}
			type={type}
			id={id}
			width={width}
			isMargin={isMargin}
			secondary={secondary}
			tabIndex={tabIndex}
		>
			{label}
		</StyledButton>
	);
}
