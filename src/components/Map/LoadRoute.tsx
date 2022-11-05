import React from 'react';
import { StyledLoadRoute, StyledInput, StyledContainer, StyledSelect } from './loadRoute.style';

export function LoadRoute() {
	return (
		<StyledLoadRoute>
			{/* <select>
				<option value="oa">Opel</option>
				<option value="m3">Mazda</option>
			</select> */}
			<StyledContainer>
				<StyledInput type="date" value="2022-10-02" />
				<StyledInput type="time" value="00:00:00" step="1" />
				<StyledInput type="date" value="2022-10-02" />
				<StyledInput type="time" value="23:59:59" step="1" />
			</StyledContainer>
			<StyledContainer>
				<StyledSelect>
					<option>...</option>
				</StyledSelect>
			</StyledContainer>
		</StyledLoadRoute>
	);
}
