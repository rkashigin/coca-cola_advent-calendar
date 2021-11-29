import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app/App';
import 'normalize.css';
import './index.scss';
// import './variables.scss';

const rootElement = document.getElementById('root');

// ReactDOM.render(
// 	<React.StrictMode>
// 		<Router>
// 			<App />
// 		</Router>
// 	</React.StrictMode>,
// 	rootElement
// );

if (rootElement.hasChildNodes()) {
    ReactDOM.hydrate(
        <React.StrictMode>
            <Router>
                <App />
            </Router>
        </React.StrictMode>,
        rootElement
    );
} else {
    ReactDOM.render(
        <React.StrictMode>
            <Router>
                <App />
            </Router>
        </React.StrictMode>,
        rootElement
    );
}
