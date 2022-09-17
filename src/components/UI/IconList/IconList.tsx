import React from 'react';
import styled from 'styled-components';

const StyledList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

interface IconListProps {
	children?: any;
}

export function IconList({ children }: IconListProps) {
	return <StyledList>{children}</StyledList>;
}
