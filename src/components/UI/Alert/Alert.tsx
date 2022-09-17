import React from 'react';
import styled from 'styled-components';

const StyledAlert = styled.div`
	font-size: 0.9em;
	box-sizing: border-box;
	background-color: ${(props) => props.theme.palette.background.red};
	border-radius: ${(props) => props.theme.shape.borderRadious};
	color: ${(props) => props.theme.palette.primary.red};
	border: 1px solid ${(props) => props.theme.palette.primary.red};
	display: inline-block;
	padding: 16px;
	width: 100%;
	margin: 8px 0;
`;

interface CardProps {
	children: JSX.Element | JSX.Element[];
}

export function Alert({ children }: CardProps) {
	return <StyledAlert>{children}</StyledAlert>;
}
