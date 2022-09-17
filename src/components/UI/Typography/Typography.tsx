import React from 'react';
import styled from 'styled-components';

const StyledTypography = styled.div<{ component: string; userSelect: string }>`
	display: inline-block;
	font-size: ${(props) => props.theme.typography[props.component].fontSize};
	font-weight: ${(props) => props.theme.typography[props.component].fontWeight};
	letter-spacing: ${(props) => props.theme.typography[props.component].letterSpacing};
	line-height: ${(props) => props.theme.typography[props.component].lineHeight};
	margin: 0;
	padding: 0;
	user-select: ${(props) => props.userSelect};
	color: ${(props) => props.color};
`;

interface TypographyProps {
	children: React.ReactChild;
	component: string;
	userSelect?: string;
	color?: string;
}

export function Typography({
	children,
	component = '',
	userSelect = 'auto',
	color = '',
}: TypographyProps) {
	return (
		<StyledTypography component={component} userSelect={userSelect} color={color}>
			{children}
		</StyledTypography>
	);
}
