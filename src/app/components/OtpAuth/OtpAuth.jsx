import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Countdown from 'react-countdown';

import { RootStore } from '../../stores/RootStore';

const OtpAuth = observer(() => {
	useEffect(() => {
		return () => { RootStore.clearOtp(); };
	}, []);
	return (
		<div>
			{
				RootStore.otp.requestId ? <OtpAuth.ValidateCode /> : <OtpAuth.GetCode />
			}
		</div>
	);
});

const GetCode = () => {
	const [tel, setTel] = useState('');
	return (
		<div>
			<input type="text" value={tel} onChange={(ev) => setTel(ev.target.value)} />
			<button type="button" onClick={() => RootStore.userOtp(tel)}>
				Получить код
			</button>
		</div>
	);
};

const ValidateCode = () => {
	const [code, setCode] = useState('');
	return (
		<div>
			<div>
				Мы отправили код на номер
				{RootStore.otpTel}
			</div>
			<Countdown date={Date.now() + RootStore.otp.expiresIn * 1000} />
			<input type="text" value={code} onChange={(ev) => setCode(ev.target.value)} />
			<button type="button" onClick={() => RootStore.loginOtp(code)}>
				Подтвердить
			</button>
		</div>
	);
};

OtpAuth.GetCode = GetCode;
OtpAuth.ValidateCode = ValidateCode;

export default OtpAuth;
