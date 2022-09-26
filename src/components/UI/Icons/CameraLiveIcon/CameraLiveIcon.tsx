import React from 'react';
import { StyledSVG } from '../IconStyle';

export function CameraLiveIcon() {
	return (
		<StyledSVG focusable="false" viewBox="0 0 24 24" aria-hidden="true">
			<g
				fill="none"
				stroke="#000"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeMiterlimit={10}
			>
				<path d="M.5 2.5h23v19H.5z" />
				<path d="M5.5 4.5h-3v3M18.5 4.5h3v3M5.5 19.5h-3v-3M18.5 19.5h3v-3" />
				<circle cx={12} cy={12} r={0.5} />
				<circle cx={12} cy={12} r={4.5} />
				<path d="M12 5.5v2M5.5 12h2M12 18.5v-2M18.5 12h-2" />
			</g>
			<path fill="none" d="M0 0h24v24H0z" />{' '}
		</StyledSVG>
	);
}
