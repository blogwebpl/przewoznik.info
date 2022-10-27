import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { RootState } from '../../../app/store';
import { setIsMenuOpen, setIsSideMenuOpen } from '../../../features/uiSlice';
import { IconButton } from '../IconButton/IconButton';
import { CarIcon } from '../Icons/CarIcon/CarIcon';
import { CloseIcon } from '../Icons/CloseIcon/CloseIcon';
import { LockIcon } from '../Icons/LockIcon/LockIcon';
import { MenuIcon } from '../Icons/MenuIcon/MenuIcon';
import { PersonIcon } from '../Icons/PersonIcon/PersonIcon';
import { Typography } from '../Typography/Typography';

const StyledAppBar = styled.header`
	align-items: center;
	background-color: ${(props) => props.theme.palette.primary.main};
	color: ${(props) => props.theme.palette.primary.defaultText};
	display: flex;
	padding: 0 24px;

	@media (orientation: landscape) {
		height: 48px;
	}
	@media (orientation: portrait) {
		height: 56px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		height: 64px;
	}
`;

const StyledTitleContainer = styled.div`
	flex-grow: 1;
	overflow: hidden;
`;

const StyledIconContainer = styled.div`
	display: flex;
`;

interface AppBarProps {
	title: string;
}

export function AppBar({ title }: AppBarProps) {
	const dispatch = useDispatch();
	const env = process.env.NODE_ENV;
	const { isSignin } = useSelector((state: RootState) => state.user);
	const { isMenuOpen, isSideMenuOpen } = useSelector((state: RootState) => state.ui);
	const handleMenuClick = () => {
		if (isSignin) {
			dispatch(setIsMenuOpen(!isMenuOpen));
		} else if (isMenuOpen) {
			dispatch(setIsMenuOpen(false));
		}
	};
	const navigate = useNavigate();
	return (
		<StyledAppBar>
			<IconButton edge="start" marginRight="16px" onClick={handleMenuClick}>
				{isMenuOpen ? <CloseIcon /> : <MenuIcon />}
			</IconButton>
			<StyledTitleContainer>
				<Typography component="h6" userSelect="none">
					<span>
						{title}&nbsp;{env === 'development' ? 'dev' : ''}
					</span>
				</Typography>
			</StyledTitleContainer>
			<StyledIconContainer>
				{isSignin && (
					<IconButton
						onClick={() => {
							dispatch(setIsSideMenuOpen(!isSideMenuOpen));
						}}
					>
						{isSideMenuOpen ? <CloseIcon /> : <CarIcon />}
					</IconButton>
				)}
				<IconButton
					edge="end"
					onClick={() => {
						if (isSignin) {
							dispatch(setIsMenuOpen(false));
							navigate('/profile');
						}
					}}
				>
					{isSignin ? <PersonIcon /> : <LockIcon />}
				</IconButton>
			</StyledIconContainer>
		</StyledAppBar>
	);
}
