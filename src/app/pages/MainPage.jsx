import React, { useEffect, useRef, useState } from 'react';
import Recaptcha from 'react-google-invisible-recaptcha';
import config from '../../config';

import { RootStoreApi } from '../stores/RootStore.api';

const MainPage = () => {
	useEffect(() => {
		(async () => {
			const { secret, token } = await RootStoreApi.dcApi.userLogin();
			setSecret(secret);
			setToken(token);
		})();
	}, []);

	const recaptchaRef = useRef(null);

	const recaptchaOnLoaded = () => {
		if (recaptchaRef.current) {
			recaptchaRef.current.execute()
				.then((rtoken) => {
					console.log(rtoken);
					setRToken(rtoken);
				});
		}
	};

	const [tel, setTel] = useState('');
	const [secret, setSecret] = useState('');
	const [token, setToken] = useState('');
	const [rtoken, setRToken] = useState('');
	return (
		<main>
			<input type="text" value={tel} onChange={(ev) => setTel(ev.target.value)} />
			<button type="button" onClick={() => { RootStoreApi.dcApi.userOtp(token, tel, rtoken); }}>
				Получить код
			</button>
            hello world!

			<Recaptcha
				ref={recaptchaRef}
				sitekey={config.recaptchaSiteKey}
				onLoaded={recaptchaOnLoaded} 
			/>
		</main>
	);
};

export default MainPage;
