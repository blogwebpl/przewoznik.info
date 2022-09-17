import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { RightIcon } from '../Icons/RightIcon/RightIcon';

const StyledItem = styled.div<{ isOpen: boolean }>`
	align-items: center;
	color: ${(props) => props.theme.palette.primary.paperText};
	display: flex;
	font-size: 1em;
	height: 2em;
	margin: 0;
	padding: 8px 16px;
	user-select: none;
	&:hover {
		background-color: ${(props) =>
			`${props.theme.palette.primary.paperText}${
				props.isOpen ? props.theme.actions.active : props.theme.actions.hover
			} }`};
	}
	&:active {
		background-color: ${(props) =>
			`${props.theme.palette.primary.paperText}${props.theme.actions.active} }`};
	}
`;

const StyledIconContainer = styled.div`
	height: 24px;
	margin-right: 32px;
	width: 24px;
`;

const StyledLabel = styled.div`
	flex-grow: 1;
`;

const StyledChevronContainer = styled.div<{ isOpen: boolean }>`
	height: 24px;
	transform: ${(props) => (props.isOpen ? 'rotate(90deg)' : 'rotate(0)')};
	transition: transform ease-out 0.35s;
	width: 24px;
`;

interface MenuItemProps {
	id: string;
	label: string;
	icon?: React.ReactNode;
	isOpen?: boolean;
	setOpenedItem?: any;
	url: string | null;
}

export function MenuItem({
	id,
	label,
	icon,
	isOpen = false,
	setOpenedItem = () => {},
	url,
}: MenuItemProps) {
	const navigate = useNavigate();
	return (
		<StyledItem
			isOpen={isOpen}
			onClick={() => {
				if (url) {
					navigate(url);
				} else {
					setOpenedItem(isOpen ? '' : id);
				}
			}}
		>
			<StyledIconContainer>{icon || null}</StyledIconContainer>
			<StyledLabel className={url ? 'link' : ''}>{label}</StyledLabel>
			{url ? null : (
				<StyledChevronContainer isOpen={isOpen}>
					<RightIcon />
				</StyledChevronContainer>
			)}
		</StyledItem>
	);
}
