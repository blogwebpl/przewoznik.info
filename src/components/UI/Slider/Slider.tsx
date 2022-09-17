import React from 'react';
import styled from 'styled-components';

const StyledSlider = styled.div`
	display: flex;
	height: 48px;
	justify-content: center;
	margin: 0 auto;
	max-width: 800px;
	width: 90%;
	input {
		outline: none;
		width: 100%;
	}
`;

interface SliderProps {
	id: string;
	min: number;
	max: number;
	value: number;
	setValue: any;
}

export function Slider({ id, min, max, value, setValue }: SliderProps) {
	return (
		<StyledSlider>
			<input
				type="range"
				min={min}
				max={max}
				value={value}
				id={id}
				onChange={(e) => {
					setValue(parseInt(e.target.value, 10));
				}}
			/>
		</StyledSlider>
	);
}
