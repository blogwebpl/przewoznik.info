import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../../app/store';
import { setIsMenuOpen } from '../../../features/uiSlice';

const StyledMain = styled.main<{ isMenuOpen: boolean; isCovered: boolean }>`
	@media (orientation: landscape) {
		top: 48px;
	}
	@media (orientation: portrait) {
		top: 56px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		left: ${(props) => (props.isMenuOpen && !props.isCovered ? '320px' : '0')};
		top: 64px;
	}
	align-items: center;
	bottom: 0;
	display: flex;
	justify-content: center;
	left: 0;
	position: fixed;
	right: 0;
	transition: all linear 0.25s;
	&:after {
		@media (orientation: landscape) {
			top: 48px;
		}
		@media (orientation: portrait) {
			top: 56px;
		}
		@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
			top: 64px;
		}
		background-color: rgba(0, 0, 0, 0.2);
		bottom: 0;
		content: '';
		display: ${(props) => (props.isMenuOpen ? 'block' : 'none')};
		left: 0;
		position: fixed;
		right: 0;
		z-index: 100;
		@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
			display: ${(props) => (props.isMenuOpen && props.isCovered ? 'block' : 'none')};
		}
	}
`;

interface MainProps {
	children: JSX.Element | JSX.Element[];
	isCovered: boolean;
}

export function Main({ children, isCovered }: MainProps) {
	const dispatch = useDispatch();
	const { isMenuOpen } = useSelector((state: RootState) => state.ui);
	const { isSignin } = useSelector((state: RootState) => state.user);
	return (
		<StyledMain
			isMenuOpen={isMenuOpen && isSignin}
			isCovered={isCovered}
			onClick={() => {
				if (isMenuOpen && isCovered) {
					dispatch(setIsMenuOpen(false));
				}
			}}
		>
			{children}
		</StyledMain>
	);
}
