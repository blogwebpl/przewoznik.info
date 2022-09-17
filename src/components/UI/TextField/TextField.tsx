import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.fieldset`
	border: 0;
	margin: 0;
	padding: 0;
	position: relative;
	input {
		border-color: ${(props) => props.theme.palette.text.hint};
		border-radius: ${(props) => props.theme.shape.borderRadious};
		border-style: solid;
		border-width: 1px;
		box-sizing: border-box;
		color: ${(props) => props.theme.palette.text.primary};
		font-family: ${(props) => props.theme.typography.fontFamily};
		font-size: 1em;
		height: 56px;
		padding: 14px 13px;
		width: 100%;
	}
	input:hover {
		border-color: ${(props) => props.theme.palette.text.primary};
	}
	input:focus {
		border-color: ${(props) => props.theme.palette.primary.main};
		border-width: 2px;
		outline: 0;
		padding: 17px 12px;
	}
	label {
		background-color: ${(props) => props.theme.palette.background.paper};
		font-size: 1em;
		left: 0;
		margin: 0;
		padding: 0 5px;
		position: absolute;
		top: 0;
	}
	input ~ label {
		color: ${(props) => props.theme.palette.text.secondary};
		pointer-events: none;
		transform: translate(8px, 19px) scale(1);
		transition: all linear 0.2s;
	}
	input:focus ~ label {
		color: ${(props) => props.theme.palette.primary.main};
	}
	input:focus ~ label,
	input.used ~ label {
		outline: 0;
		transform: translate(2px, -9px) scale(0.75);
		transition: all linear 0.2s;
	}
`;

interface TextFieldProps {
	id: string;
	label: string;
	required?: boolean;
	type: string;
	value: string | number;
	setValue: any;
	forwardedRef?: any;
	onKeyPress?: any;
	autoComplete?: string;
	autoFocus?: boolean;
}

const StyledInput = styled.input``;
const StyledLabel = styled.label``;

export function TextField({
	id,
	label,
	required = false,
	type,
	value,
	setValue,
	forwardedRef,
	onKeyPress,
	autoComplete,
	autoFocus = false,
}: TextFieldProps) {
	return (
		<StyledContainer>
			<StyledInput
				id={id}
				type={type}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className={value ? 'used' : ''}
				required={required}
				ref={forwardedRef}
				onKeyPress={onKeyPress}
				autoComplete={autoComplete}
				autoFocus={autoFocus}
			/>
			<StyledLabel htmlFor={id}>
				{label}
				{required ? ' *' : null}
			</StyledLabel>
		</StyledContainer>
	);
}
