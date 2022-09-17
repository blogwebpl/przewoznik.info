export interface DefaultTheme {
	actions: {
		active: string;
		hover: string;
	};
	breakpoints: {
		xs: string;
		sm: string;
		md: string;
		lg: string;
		xl: string;
	};
	palette: {
		background: {
			default: string;
			paper: string;
			red: string;
		};
		primary: {
			light: string;
			main: string;
			dark: string;
			defaultText: string;
			paperText: string;
			red: string;
		};
		secondary: {
			light: string;
			main: string;
			dark: string;
			defaultText: string;
			paperText: string;
			row: string;
		};
		text: {
			primary: string;
			secondary: string;
			hint: string;
		};
	};
	shadows: string[];
	shape: {
		borderRadious: string;
	};
	typography: {
		fontFamily: string;
		fontSize: string;
		fontWeightLight: string;
		fontWeightRegular: string;
		fontWeightMedium: string;
		fontWeightBold: string;
		h6: {
			fontWeight: string;
			fontSize: string;
			lineHeight: string;
			letterSpacing: string;
		};
		subtitle1: {
			fontWeight: string;
			fontSize: string;
			lineHeight: string;
			letterSpacing: string;
		};
	};
}

export const defaultTheme: DefaultTheme = {
	actions: {
		active: '20',
		hover: '10',
	},
	breakpoints: {
		xs: '0px',
		sm: '600px',
		md: '1024px',
		lg: '1440px',
		xl: '1920px',
	},
	palette: {
		background: {
			default: '#ededed',
			paper: '#fff',
			red: '#ffcdd2',
		},
		primary: {
			light: '#757de8',
			main: '#3f51b5',
			dark: '#002984',
			defaultText: '#fff',
			paperText: '#424242',
			red: '#b71c1c',
		},
		secondary: {
			light: '#ff6090',
			main: '#e91e63',
			dark: '#b0003a',
			defaultText: '#fff',
			paperText: '#424242',
			row: '#F6EAEE',
		},
		text: {
			primary: 'rgba(0, 0, 0, 0.87)',
			secondary: 'rgba(0, 0, 0, 0.54)',
			hint: 'rgba(0, 0, 0, 0.38)',
		},
	},
	shadows: [
		'none',
		'0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
		'0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
		'0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
	],
	shape: {
		borderRadious: '4px',
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-ServiceUIFrameContext',
		fontSize: '16px',
		fontWeightLight: '300',
		fontWeightRegular: '400',
		fontWeightMedium: '500',
		fontWeightBold: '700',
		h6: {
			fontWeight: '500',
			fontSize: '1.25em',
			lineHeight: '1.6',
			letterSpacing: '0.0075em',
		},
		subtitle1: {
			fontWeight: '500',
			fontSize: '1em',
			lineHeight: '1.25',
			letterSpacing: '0.15em',
		},
	},
};
