/* eslint-disable max-len */
import config from '../../config';

export const RootStoreApi = {
    // Авторизация через X-API-KEY
    // Для получения token и secret нужно дернуть ручку
    // GET /api1.2/user/ и передать x-api-key в заголовке X-Api-Key.
    dcApi: {
        async user({ apiKey = null, token = null }) {
            const headers = {};
            if (apiKey) {
                headers['X-Api-Key'] = apiKey;
            } else if (token) {
                headers['X-User-Authorization'] = token;
            }
            const response = await fetch(
                `${config.server.apiHost}/api1.2/user?cacheBreaker=${Math.floor(
                    Date.now() / 1_000
                )}`,
                {
                    headers
                }
            );
            if (response.ok) {
                return response.json();
            }

            throw response.status;
        },
        // Получение анонимного токена || логин
        async userLogin({ apiKey = null, token = null, refresh_token = null }) {
            const headers = {};
            if (apiKey) {
                headers['X-Api-Key'] = apiKey;
            } else if (token) {
                headers['X-User-Authorization'] = token;
            }

            const options = {
                method: 'post',
                headers
            };

            if (refresh_token) {
                const body = new FormData();
                body.append('refresh_token', refresh_token);

                options.body = body;
            }
            const response = await fetch(`${config.server.apiHost}/api1.2/user/login`, options);
            if (response.ok) {
                return response.json();
            }

            throw response.status;
        },
        async userLogout({ token = null, secret = null }) {
            const headers = {};
            if (token) {
                if (secret) {
                    token += `.${secret}`;
                }
                headers['X-User-Authorization'] = token;
            }
            const response = await fetch(`${config.server.apiHost}/api1.2/user/logout`, {
                method: 'post',
                headers
            });
            if (response.ok) {
                return response.json();
            }

            throw response.status;
        },
        // Авторизация через номер телефона
        // Запрос кода
        async userOtp(token, phone, recaptchaToken) {
            const body = new FormData();
            body.append('phone', phone.replace(/\s|\(|\)|\+|-/gi, ''));
            body.append('newotp', 1);

            const response = await fetch(
                `${config.server.apiHost}/api1.2/user/otp?gRecaptchaResponse=${recaptchaToken}`,
                {
                    method: 'POST',
                    headers: {
                        'X-User-Authorization': token
                    },
                    body
                }
            );

            if (response.ok) {
                return response.json();
            }

            throw response.status;
        },

        // Проверка кода и авторизация, в ответе будут token и secret, а также refreshToken
        async loginOtp(token, code, requestId) {
            const body = new FormData();
            body.append('otp', code);
            body.append('requestId', requestId);

            const response = await fetch(`${config.server.apiHost}/api1.2/user/login/otp`, {
                method: 'POST',
                headers: {
                    'X-User-Authorization': token
                },
                body
            });

            if (response.ok) {
                return response.json();
            }

            throw response.status;
        },

        getCookie(name) {
            const matches = document.cookie.match(
                new RegExp(
                    // eslint-disable-next-line no-useless-escape
                    `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
                )
            );
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }
    },
    api: {
        async auth() {
            try {
                const response = await fetch(`${process.env.PUBLIC_URL}/api/auth`);
                return response;
            } catch (error) {
                throw new Error('api auth error');
            }
        },
        async complete({ game, sign }) {
            const response = await fetch(
                `${process.env.PUBLIC_URL}/api/complete?game=${game}&sign=${sign}`,
                {
                    method: 'POST'
                }
            );
            if (response.ok) {
                return response.json();
            }

            throw response.status;
        },
        async promocodes() {
            const response = await fetch(`${process.env.PUBLIC_URL}/api/promocodes`);
            if (response.ok) {
                return response.json();
            }

            throw response.status;
        },
        async completed() {
            const response = await fetch(`${process.env.PUBLIC_URL}/api/completed`);
            if (response.ok) {
                return response.json();
            }

            throw response.status;
        }
    }
};
