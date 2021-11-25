/* eslint-disable no-console */
import {
	makeAutoObservable
} from 'mobx';

import { RootStoreApi } from './RootStore.api';

class RootStoreClass {
	secret = null

	token = null

	refreshToken = null

	xApiKey = null

	recaptchaToken = null
	
	otp = {
		attempts: null,
		expiresIn: null,
		requestId: null, 
		status: null
	}

	otpTel = null

	user = {
		id: null,
		name: null,
		phone: null
	}

	constructor() {
		makeAutoObservable(this);
		this.init();
	}

	async init() {
		this.token = RootStoreApi.dcApi.getCookie('x_user_authorization');
		const query = new URLSearchParams(window.location.search);
		if (query.get('t')) {
			this.setXApiKey(query.get('t'));
		}
		if (!this.token && !this.xApiKey) {
			const { secret, token } = await RootStoreApi.dcApi.userLogin();
			this.setSecret(secret);
			this.setToken(token);
		}
	}

	async userOtp(tel) {
		this.setOtpTel(tel);
		this.setOtp(await RootStoreApi.dcApi.userOtp(this.token, tel, this.recaptchaToken));
	}
	async loginOtp(code) {
		if (code && code.length === 6) {
			const data = await RootStoreApi.dcApi.loginOtp(this.token, code, this.otp.requestId);
			console.log(data);
			// const {
			// 	id, name, phone, refresh_token, secret, token 
			// } = await RootStoreApi.dcApi.loginOtp(this.token, code, this.otp.requestId);
		} else {
			console.log('code err');
		}
	}

	setXApiKey(xApiKey) {
		this.xApiKey = xApiKey;
	}
	setToken(token) {
		this.token = token;
	}
	setSecret(secret) {
		this.secret = secret;
	}
	setRecaptchaToken(recaptchaToken) {
		this.recaptchaToken = recaptchaToken;
	}

	setOtpTel(tel) {
		this.otpTel = tel;
	}
	setOtp(otp) {
		this.otp = otp;
	}

	clearOtp() {
		this.otp = {
			attempts: null,
			expiresIn: null,
			requestId: null, 
			status: null
		};
	}
}

export const RootStore = new RootStoreClass();
