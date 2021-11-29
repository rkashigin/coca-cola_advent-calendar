/* eslint-disable no-console */
import Cookies from 'js-cookie';
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

		this.getUserData();
	}

	async init() {
		console.log(Cookies);
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
		try {
			this.setOtpTel(tel);
			this.setOtp(await RootStoreApi.dcApi.userOtp(this.token, tel, this.recaptchaToken));
		} catch (error) {
			console.log(error);
		}
	}

	async loginOtp(code) {
		if (code && code.length === 6) {
			const data = await RootStoreApi.dcApi.loginOtp(this.token, code, this.otp.requestId);

			const { id, name, phone } = data;
			this.setUser({ id, name, phone });
			this.setRefreshToken(data.refresh_token);
			this.setSecret(data.secret);
			this.setToken(data.token);
		} else {
			console.log('code err');
		}
	}

	async getUserData() {
		if (this.xApiKey || this.token) {
			const userData = await RootStoreApi.dcApi.user({ xApiKey: this.xApiKey, token: this.token });
			console.log(userData);
		}
	}

	setUser(user) {
		this.user = user;
	}

	setXApiKey(xApiKey) {
		this.xApiKey = xApiKey;
	}
	setToken(token) {
		Cookies.set('x_user_authorization', token);
		this.token = token;
	}
	setRefreshToken(refreshToken) {
		Cookies.set('refresh_token', refreshToken);
		this.refreshToken = refreshToken;
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
