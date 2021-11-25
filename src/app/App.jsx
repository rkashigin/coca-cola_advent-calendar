import { React, useRef } from 'react';
import { Route } from 'react-router-dom';
import Recaptcha from 'react-google-invisible-recaptcha';

import { Routes } from 'react-router';
import MainPage from './pages/MainPage';

import { RootStore } from './stores/RootStore';
import config from '../config';

const App = () => {
	const recaptchaRef = useRef(null);
	const recaptchaOnLoaded = () => {
		if (recaptchaRef.current) {
			recaptchaRef.current.execute()
				.then((rtoken) => {
					RootStore.setRecaptchaToken(rtoken);
				});
		}
	};
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<MainPage />} />
			</Routes>
			<Recaptcha
				ref={recaptchaRef}
				sitekey={config.recaptchaSiteKey}
				onLoaded={recaptchaOnLoaded} 
			/>
		</div>
	);
};

export default App;
