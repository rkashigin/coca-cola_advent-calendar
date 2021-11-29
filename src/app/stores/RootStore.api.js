/* eslint-disable max-len */
import config from '../../config';

export const RootStoreApi = {
	// Авторизация через X-API-KEY
	// Для получения token и secret нужно дернуть ручку 
	// GET /api1.2/user/ и передать x-api-key в заголовке X-Api-Key.
	dcApi: {
		async user(apiKey) {
			const response = await fetch(`${config.server.apiHost}/api1.2/user`, {
				headers: {
					'X-Api-Key': apiKey
				}
			});
			if (response.ok) {
				return response.json();
			}
		
			throw response.status;
		},
		// Получение анонимного токена
		async userLogin() { 
			const response = await fetch(`${config.server.apiHost}/api1.2/user/login`, { method: 'post' });
			if (response.ok) {
				return response.json();
			}
	
			throw response.status;
		},
		// Авторизация через номер телефона
		// Запрос кода
		async userOtp(token, phone, recaptchaToken) {
			const body = new FormData();
			body.append('phone', phone);
			body.append('newotp', 1);

			const response = await fetch(`${config.server.apiHost}/api1.2/user/otp?gRecaptchaResponse=${recaptchaToken}`, { 
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
			const matches = document.cookie.match(new RegExp(
				// eslint-disable-next-line no-useless-escape
				`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
			));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		}
	}
};
