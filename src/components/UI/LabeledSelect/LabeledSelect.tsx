import React, { useState } from 'react';

import { StyledLabel, StyledLabeledSelect, StyledSelect, multiselectStyle } from './styles';

interface LabeledSelectProps {
	id: string;
	margin?: boolean;
	width?: number;
	label: string;
	isMulti?: boolean;
	isRequired?: boolean;
	isClearable?: boolean;
	isSearchable?: boolean;
	isDisabled?: boolean;
	onChange: any;
	values: any;
	options: any;
}

export function LabeledSelect({
	id,
	margin = false,
	width,
	label,
	isMulti = false,
	isRequired = false,
	isClearable = false,
	isSearchable = false,
	isDisabled = false,
	onChange,
	values,
	options,
}: LabeledSelectProps) {
	const [active, setActive] = useState(false);
	return (
		<StyledLabeledSelect
			margin={margin}
			width={width}
			onClick={() => {
				setActive(true);
			}}
			onBlur={() => {
				setActive(false);
			}}
		>
			<StyledLabel active={active} htmlFor={id}>
				{label}
				{isRequired ? ' *' : ''}
			</StyledLabel>
			<StyledSelect
				isClearable={isClearable}
				id={id}
				onChange={(newValue: any) => {
					onChange(newValue);
				}}
				options={options}
				value={values}
				isMulti={isMulti}
				isSearchable={isSearchable}
				styles={multiselectStyle}
				classNamePrefix="react-select"
				isDisabled={isDisabled}
			/>
		</StyledLabeledSelect>
	);
}
