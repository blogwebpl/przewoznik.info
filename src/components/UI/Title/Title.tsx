import React from 'react';
import styled from 'styled-components';

import { Typography } from '../Typography/Typography';

const StyledTitle = styled.div`
	height: 32px;
	width: 100%;
`;

interface TitleProps {
	caption: string;
}

export function Title({ caption }: TitleProps) {
	return (
		<StyledTitle>
			<Typography component="h6" userSelect="none">
				{caption}
			</Typography>
		</StyledTitle>
	);
}
