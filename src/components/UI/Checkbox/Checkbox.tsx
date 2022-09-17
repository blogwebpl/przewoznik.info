import React from 'react';
import styled from 'styled-components';

import { IconButton } from '../IconButton/IconButton';
import { CheckboxBlankIcon } from '../Icons/CheckboxBlankIcon/CheckboxBlankIcon';
import { CheckboxMarkedIcon } from '../Icons/CheckboxMarkedIcon/CheckboxMarkedIcon';

const StyledCheckBox = styled.div`
	align-items: center;
	display: flex;
`;

const StyledLabel = styled.label`
	user-select: none;
`;

interface CheckboxProps {
	label?: string;
	edge?: string;
	checked: boolean;
	setChecked: any;
	marginLeft?: string;
	id?: string;
}

export function Checkbox({
	label = '',
	edge = 'start',
	checked,
	setChecked,
	marginLeft,
	id,
}: CheckboxProps) {
	return (
		<StyledCheckBox
			onClick={() => {
				setChecked(!checked);
			}}
		>
			<IconButton
				id={id}
				edge={edge}
				marginLeft={marginLeft}
				color={checked ? '#FF4081' : '#777777'}
			>
				{checked ? <CheckboxMarkedIcon /> : <CheckboxBlankIcon />}
			</IconButton>
			<StyledLabel>{label}</StyledLabel>
		</StyledCheckBox>
	);
}
