import React from 'react';
import { StyledSVG } from '../IconStyle';

export function PauseIcon() {
	return (
		<StyledSVG focusable="false" viewBox="0 0 24 24" aria-hidden="true">
			<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
			<path d="M0 0h24v24H0z" fill="none" />
		</StyledSVG>
	);
}
