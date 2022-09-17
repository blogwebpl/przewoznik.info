import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../../app/store';
import { setIsMenuOpen } from '../../../features/uiSlice';
import { Menu } from '../Menu/Menu';

const StyledDrawer = styled.div<{ isMenuOpen: boolean }>`
	background-color: ${(props) => props.theme.palette.background.paper};
	bottom: 0;
	box-shadow: ${(props) => props.theme.shadows[3]};
	left: 0;
	max-width: calc(100% - 56px);
	overflow: hidden;
	position: fixed;
	transform: ${(props) => (props.isMenuOpen ? 'translate(0px)' : 'translate(-101%)')};
	transition: transform 0.25s ease-in-out 0s;
	width: 320px;
	@media (orientation: landscape) {
		top: 48px;
	}
	@media (orientation: portrait) {
		top: 56px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		top: 64px;
	}
`;

interface DrawerProps {
	closeOnClick: boolean;
}

export function Drawer({ closeOnClick }: DrawerProps) {
	const dispatch = useDispatch();
	const { isMenuOpen } = useSelector((state: RootState) => state.ui);
	return (
		<StyledDrawer
			className="drawer"
			isMenuOpen={isMenuOpen}
			onClick={(e) => {
				if (!closeOnClick) {
					return;
				}
				const target = e.target as Element;
				const isDrawer = target.classList.contains('drawer');
				const isMenu = target.classList.contains('menu');
				const hasLinkChildren = target.querySelectorAll('.link').length > 0;
				const isLink = target.classList.contains('link');
				if ((!isDrawer && !isMenu && hasLinkChildren) || isLink) {
					dispatch(setIsMenuOpen(false));
				}
			}}
		>
			<Menu />
		</StyledDrawer>
	);
}
