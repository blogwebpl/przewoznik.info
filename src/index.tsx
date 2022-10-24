import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { store } from './app/store';
import { App } from './components/App';
import { GlobalStyles } from './styles/globalStyles';
import { defaultTheme } from './styles/themes';
import 'leaflet/dist/leaflet.css';

const app = document.getElementById('app');

const root = createRoot(app!);
root.render(
	<Provider store={store}>
		<ThemeProvider theme={defaultTheme}>
			<Router>
				<GlobalStyles />
				<App />
			</Router>
		</ThemeProvider>
	</Provider>
);
