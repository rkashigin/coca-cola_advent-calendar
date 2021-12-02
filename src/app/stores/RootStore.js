/* eslint-disable no-console */
import Cookies from 'js-cookie';
import { makeAutoObservable, when } from 'mobx';
import sha256 from 'sha256';
import config from '../../config';

import { RootStoreApi } from './RootStore.api';

class RootStoreClass {
    secret = null;

    token = null;

    refreshToken = null;

    xApiKey = null;

    // recaptchaToken = null;

    // recaptchaRef = null;

    otp = {
        attempts: null,
        expiresIn: null,
        requestId: null,
        status: null
    };

    otpTel = null;

    user = {
        id: null,
        name: null,
        phone: null
    };

    oauthOpen = false;

    oauthCodeErr = false;

    colaAuth = false;

    myPromocodes = [];

    myGamesCompleted = Number(localStorage.getItem('completedGames'))
        ? this.user.id
            ? Number(localStorage.getItem('completedGames'))
            : 0
        : 0;

    date = null;

    constructor() {
        makeAutoObservable(this);
        this.init();
        when(
            () => !!this.colaAuth,
            () => {
                this.updatePromocodes();
                this.updateComplitedGames();
            }
        );
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
            console.log(query.get('t'));
            this.setXApiKey(query.get('t'));
        }
        if (!this.token && !this.xApiKey) {
            await this.getAnonymousToken();
        } else {
            this.getUserData();
        }

        const response = await fetch('https://world-clock.p.rapidapi.com/json/utc/now', {
            headers: {
                'x-rapidapi-host': 'world-clock.p.rapidapi.com',
                'x-rapidapi-key': '4448b2214fmsh71926ea0ccd6790p1fb7f4jsnf43f826de7ec'
            }
        });

        if (response.ok) {
            const data = await response.json();

            this.date = data.currentDateTime;
        }
    }

    async getAnonymousToken() {
        try {
            const { secret, token } = await RootStoreApi.dcApi.userLogin({
                xApiKey: null,
                token: null
            });

            this.setSecret(secret);
            this.setToken(token);
            return { secret, token };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async userOtp(tel, recaptchaToken) {
        try {
            console.log(tel);
            console.log(recaptchaToken);
            const { token, secret } = await this.getAnonymousToken();
            this.setOtpTel(tel);
            this.setOtp(
                await RootStoreApi.dcApi.userOtp(`${token}.${secret}`, tel, recaptchaToken)
            );
            this.setOauthCodeErr(false);
        } catch (error) {
            console.log(error);
            this.setOauthCodeErr(error);
        }
    }

    async loginOtp(code) {
        if (code && code.length === 6) {
            try {
                const data = await RootStoreApi.dcApi.loginOtp(
                    `${this.token}.${this.secret}`,
                    code,
                    this.otp.requestId
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

                if (id) {
                    this.setOtpTel(null);
                    this.clearOtp();
                    this.setOauthOpen(false);
                    const colaAuth = await RootStoreApi.api.auth();
                    if (colaAuth.ok) {
                        this.setColaAuth(colaAuth.ok);
                        await this.updateComplitedGames();
                        await this.updatePromocodes();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('code err');
        }
    }

    async getUserData(tryIdx = 0) {
        if (tryIdx < 2) {
            try {
                if (this.xApiKey || this.token) {
                    let { token } = this;
                    if (this.secret && !token.split('.')[1]) {
                        token += `.${this.secret}`;
                    }
                    const data = await RootStoreApi.dcApi.user({
                        xApiKey: this.xApiKey,
                        token
                    });
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

                    if (id) {
                        const colaAuth = await RootStoreApi.api.auth();
                        this.setColaAuth(colaAuth.ok);
                    }
                }
            } catch (error) {
                if ([401, 403, 423].includes(error)) {
                    console.log('error');
                    console.log(error);

                    const data = await RootStoreApi.dcApi.userLogin({
                        xApiKey: this.xApiKey,
                        token: this.token,
                        refresh_token: this.refreshToken
                    });
                    if (data.secret) {
                        this.setSecret(data.secret);
                        data.token += `.${data.secret}`;
                    }
                    if (data.refresh_token) {
                        this.setRefreshToken(data.refresh_token);
                    }
                    this.setToken(data.token);
                    console.log(data);

                    this.getUserData(tryIdx + 1);
                }
            }
        } else {
            console.warn('tryIdx === 2');
        }
    }

    logout() {
        // RootStoreApi.dcApi.userLogout({ token: this.token, secret: this.secret });
        Cookies.remove('x_user_authorization', { path: '/', domain: config.server.domain });
        this.setUser({ id: null, name: null, phone: null });
        this.setToken(null, false);
        this.setSecret(null);
        this.setColaAuth(false);
        this.setMyGamesCompleted(0);
        localStorage.setItem('completedGames', 0);
        when(
            () => !!this.colaAuth,
            () => {
                this.updatePromocodes();
                this.updateComplitedGames();
                // const promocodes = await RootStoreApi.api.promocodes();
                // this.setMyPromocodes(promocodes);

                // const { completed } = await RootStoreApi.api.completed();
                // this.setMyGamesCompleted(completed);
            }
        );
    }

    async dayComplete(game) {
        try {
            if (game && this.user.id?.primary) {
                const sign = sha256(`${this.user.id.primary}/${game}`);
                const data = await RootStoreApi.api.complete({ sign, game });
                this.updatePromocodes();
                this.updateComplitedGames();
                console.log(data);
                return data;
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async updatePromocodes() {
        const promocodes = await RootStoreApi.api.promocodes();
        this.setMyPromocodes(promocodes);
    }

    async updateComplitedGames() {
        const { completed } = await RootStoreApi.api.completed();
        this.setMyGamesCompleted(completed);
        localStorage.setItem('completedGames', completed);
    }

    setRecaptchaRef(ref) {
        this.recaptchaRef = ref;
    }

    setMyGamesCompleted(completed) {
        this.myGamesCompleted = completed;
    }

    setMyPromocodes(promocodes) {
        this.myPromocodes = promocodes;
    }

    setColaAuth(isAuth) {
        this.colaAuth = isAuth;
    }

    setOauthCodeErr(err) {
        this.oauthCodeErr = err;
    }

    setOauthOpen(isOpen) {
        this.oauthOpen = isOpen;
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
    // setRecaptchaToken(recaptchaToken) {
    //     this.recaptchaToken = recaptchaToken;
    // }

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

    // get recaptchaTokenIsNull() {
    //     return !this.recaptchaToken;
    // }
}

export const RootStore = new RootStoreClass();
