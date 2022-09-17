import React from 'react';
import styled from 'styled-components';

import { ExitIcon } from '../Icons/ExitIcon/ExitIcon';
import { SecurityIcon } from '../Icons/SecurityIcon/SecurityIcon';

interface IconListItemProps {
	icon: string;
	label: string;
	action?: any;
}

const StyledItem = styled.li`
	display: flex;
	height: 48px;
	cursor: pointer;
	padding: 0 16px;
	align-items: center;
	transition: all 0.15 s ease-in-out;
	span {
		margin-left: 32px;
		display: inline-block;
	}
	&:hover {
		background-color: #eee;
	}
`;

function GetIcon({ icon }: { icon: string }) {
	switch (icon) {
		case 'Exit':
			return <ExitIcon />;
		case 'Security':
			return <SecurityIcon />;
		default:
			return null;
	}
}

export function IconListItem({ icon, label, action }: IconListItemProps) {
	return (
		<StyledItem onClick={action}>
			<GetIcon icon={icon} />
			<span>{label}</span>
		</StyledItem>
	);
}
