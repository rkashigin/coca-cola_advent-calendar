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
		
			throw new Error(`Ошибка HTTP: ${response.status}`);
		},
		// Получение анонимного токена
		async userLogin() { 
			const response = await fetch(`${config.server.apiHost}/api1.2/user/login`, { method: 'post' });
			if (response.ok) {
				return response.json();
			}
	
			throw new Error(`Ошибка HTTP: ${response.status}`);
		},
		// Авторизация через номер телефона
		// Запрос кода
		async userOtp(token, phone, rtoken) {
			// Параметр newotp=1, чтобы отправить 6-значный код (обязательный).
			// fetch('https://api.delivery-club.ru/api1.2/user/otp?gRecaptchaResponse=03AGdBq2567B9tIUxg9jSTw0qd_Dk-9L8vf5tsdvbja-dNb4Y0nLeYliQkiOY1irDMN0YvvTdOBPqflEzbCEWAOfTtkdWK4nQ1lf5k4lnmdpHHrkJG7QgfSP1cmcDKfhWoR_ecZ9Pqr16x6RG_xJEmp3CInQuXBLEVSnBATzywMLkET6p8s8mh7E4MVFCbSm2zWmRjdfCvusyjBj8WYf23-MuJ1DMfpwIn4J7-ypH1vlbrhtcGJ9V7RQBLLqTZlUpyJ34_pJqyKR9Saq6pERBBt4JY8mTFSaCiMjXG-AbNQ8YxsGQW9CNRYIuo25UP1W8yiwtbmCWcP-Dfea8EgeOBNH7NnSTFFUse-SoPTZCc8c_8NNZvAzcP8gIgdR7_a85kKDn2ULvA0HobsCXE55uQj3whGVWaFeIyc7IBEoGL4sxp86oWrXkaqxzYeSWpq3Pir8wzhc4MdWF9', {
			// 	headers: {
			// 		accept: 'application/json, text/plain, */*',
			// 		'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
			// 		'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryZlmSNMXbROhptOZp',
			// 		'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
			// 		'sec-ch-ua-mobile': '?0',
			// 		'sec-ch-ua-platform': '"macOS"',
			// 		'sec-fetch-dest': 'empty',
			// 		'sec-fetch-mode': 'cors',
			// 		'sec-fetch-site': 'same-site',
			// 		'x-entity-id': 'xNXt7Dr0TVukjkbNbfmuNg',
			// 		'x-user-authorization': 'eyJ0b2tlbiI6ImExYTY1YzVhYzUzNjdiZmRlYjc1MzdlNThiMDFmNDM5NmIxMjQxNjgiLCJzZWNyZXQiOiIzMGMxMTlmYzU4OTkxM2Q5YWYzNWUyOGZlODM0YTdlMWQ2NDE2Njg5IiwicGxhdGZvcm0iOiJtYXJrZXQiLCJ1c2VySUQiOjAsImRldmljZUlEIjoiZjAzYjAxOWYtNGRkMS00ZGIzLTg3ODMtODU1MmJmNWQ1NjVmIiwiaW5zdGFsbElEIjoiNWFkODczYjkwOTU1NmZmMzU2YmI3MzE0MDU0ZWZmZjYxNWUwZDNhNSIsImV4cCI6MTYzNzEwMDA0OH0.DCijs1WqOxoNwbILQucT8wXJqcMzSVvfRVP0nOWIh8M'
			// 	},
			// 	referrer: 'https://www.delivery-club.ru/moscow?authPopupOpened=1',
			// 	referrerPolicy: 'no-referrer-when-downgrade',
			// 	body: '------WebKitFormBoundaryZlmSNMXbROhptOZp\r\nContent-Disposition: form-data; name="phone"\r\n\r\n79917066689\r\n------WebKitFormBoundaryZlmSNMXbROhptOZp\r\nContent-Disposition: form-data; name="newotp"\r\n\r\n1\r\n------WebKitFormBoundaryZlmSNMXbROhptOZp--\r\n',
			// 	method: 'POST',
			// 	mode: 'cors',
			// 	credentials: 'include'
			// });

			const body = new FormData();
			body.append('phone', phone);
			body.append('newotp', 1);

			const response = await fetch(`${config.server.apiHost}/api1.2/user/otp?gRecaptchaResponse=${rtoken}`, { 
				method: 'POST',
				headers: {
					'X-User-Authorization': token
				},
				body
			}); 
	
			if (response.ok) {
				return response.json();
			}
	
			throw new Error(`Ошибка HTTP: ${response.status}`);
		}
	}
};
