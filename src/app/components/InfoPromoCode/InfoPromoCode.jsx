import React from 'react';

import styles from '../PromoCode/PromoCode.module.scss';

const InfoPromoCode = () => {
    return (
        <div className={styles.infoPromoCode}>
            Срок активации кода – до 31.03.2022. На момент активации кода у Пользователя не должно
            быть действующей подписки, Пользователь не должен быть участником других акций в
            отношении подписки в предыдущие 180 дней. Необходимо указать данные банковской карты
            Пользователя. Услуги предоставляются в соответствии с{' '}
            <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoPromoCode__link}
            >
                Пользовательским соглашением сервиса
            </a>{' '}
            IVI и{' '}
            <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoPromoCode__link}
            >
                Правилами использования сертификатов
            </a>
            . Сервис IVI 18+.
        </div>
    );
};

export default InfoPromoCode;
