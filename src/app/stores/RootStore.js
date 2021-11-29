/* eslint-disable no-console */
import Cookies from 'js-cookie';
import {
	makeAutoObservable
} from 'mobx';
import config from '../../config';

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
		const tokenCookie = RootStoreApi.dcApi.getCookie('x_user_authorization');
		this.token = tokenCookie;
		const secret = tokenCookie && tokenCookie.split('.').slice(1, 1);
		if (secret) {
			this.secret = secret;
		}
		this.refreshToken = RootStoreApi.dcApi.getCookie('refresh_token');
		const query = new URLSearchParams(window.location.search);
		if (query.get('t')) {
			this.setXApiKey(query.get('t'));
		}
		if (!this.token && !this.xApiKey) {
			const { secret, token } = await RootStoreApi.dcApi.userLogin(
				{ xApiKey: null, token: null }
			);
			this.setSecret(secret);
			this.setToken(token, false);
		} else {
			this.getUserData();
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
			if (data.refresh_token) {
				this.setRefreshToken(data.refresh_token);
			}
			if (data.secret) {
				this.setSecret(data.secret);
				data.token += `.${data.secret}`;
			}
			this.setToken(data.token);
			console.log(data);
		} else {
			console.log('code err');
		}
	}

	async getUserData(tryIdx = 0) {
		if (tryIdx < 4) {
			try {
				if (this.xApiKey || this.token) {
					const data = await RootStoreApi.dcApi.user(
						{ xApiKey: this.xApiKey, token: this.token }
					);
					const { id, name, phone } = data;
					this.setUser({ id, name, phone });
					if (data.refresh_token) {
						this.setRefreshToken(data.refresh_token);
					}
					if (data.secret) {
						this.setSecret(data.secret);
						data.token += `.${data.secret}`;
					}
					this.setToken(data.token);
					console.log(data);
				}
			} catch (error) {
				if ([401, 403, 423].includes(error)) {
					console.log('error');
					console.log(error);
					if (error !== 401) {
						return;
					}
					const data = await RootStoreApi.dcApi.userLogin(
						{ 
							xApiKey: this.xApiKey, 
							token: error === 401 && this.refreshToken ? this.refreshToken : this.token 
						}
					);
					if (data.secret) {
						this.setSecret(data.secret);
						data.token += `.${data.secret}`;
					}
					this.setToken(data.token);
					console.log(data);

					this.getUserData(tryIdx + 1);
				}
			}
		} else {
			console.warn('tryIdx === 4');
		}
	}

	setUser(user) {
		this.user = user;
	}

	setXApiKey(xApiKey) {
		this.xApiKey = xApiKey;
	}
	setToken(token, isAuth = true) {
		if (isAuth) {
			Cookies.set('x_user_authorization', token, { path: '/', domain: config.server.domain });
		}
		this.token = token;
	}
	setRefreshToken(refreshToken) {
		Cookies.set('refresh_token', refreshToken, { path: '/', domain: config.server.domain });
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
