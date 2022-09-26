import React from 'react';
import { StyledSVG } from '../IconStyle';

export function CarBatteryIcon() {
	return (
		<StyledSVG focusable="false" viewBox="0 0 24 24" aria-hidden="true">
			<g fill="none" stroke="#000" strokeLinejoin="round" strokeMiterlimit={10}>
				<path d="M.5 6.5h23v14H.5zM3.5 3.5h4v3h-4zM16.5 3.5h4v3h-4z" />
				<path strokeLinecap="round" d="M3 12.5h5M16 12.5h5M18.5 10v5" />
			</g>
			<path fill="none" d="M0 0h24v24H0z" />{' '}
		</StyledSVG>
	);
}
