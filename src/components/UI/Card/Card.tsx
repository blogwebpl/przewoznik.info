import React from 'react';
import styled, { keyframes } from 'styled-components';

interface StyledCardProps {
	padding: boolean;
	minWidth: number;
}

const fadeIn = keyframes`
	0% {
		opacity: 0.0;
	}
	100% {
		opacity: 1
	}
`;

const StyledCard = styled.div<StyledCardProps>`
	animation: ${fadeIn} 300ms linear;
	background-color: ${(props) => props.theme.palette.background.paper};
	border-radius: ${(props) => props.theme.shape.borderRadious};
	box-shadow: ${(props) => props.theme.shadows[2]};
	color: ${(props) => props.theme.palette.primary.paperText};
	display: inline-block;
	padding: ${(props) => (props.padding ? '16px' : '0')};
	width: min(calc(100% - 2rem), ${(props) => props.minWidth}px);
	margin-inline: auto;
	box-sizing: border-box;
`;
// min-width: ${(props) => props.minWidth}px;
// max-width: ${(props) => props.maxWidth}px;

interface CardProps {
	children: JSX.Element | JSX.Element[];
	minWidth: number;
	padding?: boolean;
}
export function Card({ children, padding = false, minWidth = 320 }: CardProps) {
	return (
		<StyledCard padding={padding} minWidth={minWidth}>
			{children}
		</StyledCard>
	);
}
