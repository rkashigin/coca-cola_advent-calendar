/* eslint-disable max-classes-per-file */
/* eslint-disable no-console */
class GAUtilsClass {
    sendPageViewEvent = (args = {}) => {
        setTimeout(() => {
            console.log('GA');
            const arr = ['colacola.send', 'event'];
            Object.values(args).forEach((el) => {
                arr.push(el);
            });
            console.log(`arr: ${arr}`);
            window.ga(...arr);
        });
    };
}

class SnitchSenderClasss {
    send = (args = {}) => {
        setTimeout(() => {
            console.log('snitch');
            console.log(args);
            const { event_category } = args;
            delete args.event;
            window?.snitch(event_category, args);
        });
    };
}

export const GAUtils = new GAUtilsClass();
export const snitchSender = new SnitchSenderClasss();

export const GA_MAP = {
    fb: { event_category: 'social media', event: 'Click', event_label: 'FB' }, // шеры в соцсети
    vk: { event_category: 'social media', event: 'Click', event_label: 'VK' },
    twitter: { event_category: 'social media', event: 'Click', event_label: 'Twitter' },
    // ok: { event_category: 'social media', event: 'Click', event_label: 'OK' },
    externalLink: (link) => {
        return { event_category: 'link', event: 'Click', event_label: link };
    }, // переход по внешней ссылке
    time: (page, time) => {
        return { event_category: page, event: 'timeleft', event_label: time };
    }, // время на странице и в играх
    buttonClick: (name) => {
        return { event_category: 'button', event: 'Click', event_label: name };
    }, // нажатие на кнопку
    userLogin: { event_category: 'user', event: 'login', event_label: 'authorization' }, // авторизация
    userLogout: { event_category: 'user', event: 'logout', event_label: 'authorization' }
};

const sendEvent = (args = {}) => {
    GAUtils.sendPageViewEvent(args);
    snitchSender.send(args);
};

export default sendEvent;
