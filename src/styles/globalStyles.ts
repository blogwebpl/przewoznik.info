import { createGlobalStyle } from 'styled-components';

import { DefaultTheme } from './themes';

export const GlobalStyles = createGlobalStyle<{ theme: DefaultTheme }>`

	body {
		background-color: ${(props) => props.theme.palette.background.default};
		font-family: ${(props) => props.theme.typography.fontFamily};
		font-size: ${(props) => props.theme.typography.fontSize};
		-webkit-font-smoothing: antialiased;
		font-weight: ${(props) => props.theme.typography.fontWeightRegular};
		margin: 0;
		padding: 0
	}
	h6 {
		display: inline-block;
		font-size:${(props) => props.theme.typography.h6.fontSize};
		font-weight: ${(props) => props.theme.typography.h6.fontWeight};
		letter-spacing: ${(props) => props.theme.typography.h6.letterSpacing};
		line-height: ${(props) => props.theme.typography.h6.lineHeight};
		margin: 0;
		padding: 0
	}
	.marker-label-red {
		color: #363640;
		font-size: 11.5px;
	}
	.marker-label-blue {
		color: blue;
		font-size: 11.5px;
	}
`;
