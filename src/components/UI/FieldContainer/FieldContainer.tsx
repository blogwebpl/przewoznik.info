import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
	margin: 0;
	padding: 16px 0 8px 0;
`;

interface FieldContainerProps {
	children: JSX.Element;
}

export function FieldContainer({ children }: FieldContainerProps) {
	return <StyledContainer>{children}</StyledContainer>;
}
