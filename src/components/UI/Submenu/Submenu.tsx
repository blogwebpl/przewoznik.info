import React from 'react';
import styled from 'styled-components';

const StyledSubmenu = styled.div<{ isOpen: boolean; elements: number }>`
	font-size: 14px;
	height: auto;
	max-height: ${(props) => (props.isOpen ? `${44 * props.elements}px` : '0')};
	overflow: hidden;
	transition: max-height 0.35s ease-out;
	a {
		text-decoration: none;
	}
`;

interface SubmenuProps {
	children: JSX.Element | JSX.Element[];
	isOpen: boolean;
	elements: number;
}

export function Submenu({ children, isOpen, elements }: SubmenuProps) {
	return (
		<StyledSubmenu elements={elements} isOpen={isOpen}>
			{children}
		</StyledSubmenu>
	);
}
