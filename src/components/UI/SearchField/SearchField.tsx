import React, { useState } from 'react';
import styled from 'styled-components';

import { SearchIcon } from '../Icons/SearchIcon/SearchIcon';

const StyledWrapper = styled.div`
	margin-left: 8px;
	margin-right: 16px;
	height: 35px;
	position: relative;
	width: auto;
	@media screen and (max-width: 767px) {
		max-width: 150px;
	}
	background: #eee;
	border-radius: 3px;
	color: #777;
`;

const IconWrapper = styled.div`
	width: 56px;
	height: 100%;
	position: absolute;
	pointer-events: none;
	display: flex;
	align-items: center;
	justify-content: center;
	@media screen and (max-width: 767px) {
		width: 42px;
	}
`;

const StyledInput = styled.input`
	border: 0;
	margin: 0;
	padding: 8px 8px 8px 72px;
	outline: none;
	background: transparent;
	font-size: 16px;
	width: 100px;
	transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	&:focus {
		width: 120px;
	}
`;

interface SearchFieldProps {
	id: string;
	type: string;
	value: string | number;
	setValue: any;
}

export function SearchField({ id, type, value, setValue }: SearchFieldProps) {
	return (
		<StyledWrapper>
			<IconWrapper>
				<SearchIcon />
			</IconWrapper>
			<StyledInput
				id={id}
				placeholder="Szukaj..."
				value={value}
				onChange={(e) => {
					e.preventDefault();
					setValue(e.target.value);
				}}
				type={type}
			/>
		</StyledWrapper>
	);
}
