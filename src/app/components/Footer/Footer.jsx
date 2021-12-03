import React from 'react';
import classNames from 'classnames';

import { ReactComponent as SnowDecoration } from '../../assets/images/Footer_snow.svg';
import { ReactComponent as SnowDecorationMobile } from '../../assets/images/Footer_snow_mobile.svg';

import styles from './Footer.module.scss';
import sendEvent, { GA_MAP } from '../../helpers/analytics';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <SnowDecoration className={styles.footer__decoration} />
            <div className={styles.footer__card}>
                <h3 className={styles.footer__cardTitle}>
                    Получайте яркие призы вместе с Coca-Cola и Delivery Club
                </h3>
                <img
                    className={styles.footer__cardPrize_ivi}
                    src={require('../../assets/images/Footer_card_ivi.svg').default}
                    alt="IVI"
                />
                <img
                    className={styles.footer__cardPrize_delivery}
                    src={require('../../assets/images/Footer_card_delivery.svg').default}
                    alt="Delivery"
                />
                <img
                    className={styles.footer__cardband_bottom}
                    src={require('../../assets/images/Foter_card_band_bottom.png').default}
                    alt="band"
                />
                <img
                    className={styles.footer__cardband_left}
                    src={require('../../assets/images/Footer_card_band_left.png').default}
                    alt="band"
                />
            </div>
            <div className={classNames(styles.footer__card, styles.footer__card_red)}>
                <h3 className={styles.footer__cardTitle}>
                    Пройдите календарь и участвуйте в розыгрыше главного приза!
                </h3>
                <span className={styles.footer__cardSubTitle}>
                    4 уникальных холодильника с запасом Coca-Cola и промокоды 3 500 ₽ на заказы в
                    ресторанах!
                </span>
                <picture>
                    <source
                        srcSet={
                            require('../../assets/images/Footer_prize_cards_mobile.png').default
                        }
                        media="(max-width: 725px)"
                    />
                    {/* <img
                        className={styles.footer__cardPrize_multiple}
                        src={
                            require('../../assets/images/Footer_card_cola_and_delivery.svg').default
                        }
                        alt="Delivery and Coca-Cola"
                    /> */}
                    <img
                        className={styles.footer__cardPrize_multiple}
                        src={
                            require('../../assets/images/Footer_card_cola_and_delivery.png').default
                        }
                        alt="Delivery and Coca-Cola"
                    />
                </picture>
            </div>
            <div className={styles.footer__intro}>
                <div className={styles.footer__bgSnowFlakes} />
                <img
                    className={styles.footer__band}
                    src={require('../../assets/images/Footer_band.png').default}
                    alt="band"
                />
                <img
                    className={styles.footer__prizeCards}
                    src={require('../../assets/images/Footer_prize_cards.svg').default}
                    alt="Prize from Delivery"
                />
                <h2 className={styles.footer__title}>
                    Розыгрыши больших призов для участников advent-календаря
                </h2>
                <span className={styles.footer__subTitle}>
                    * Результаты розыгрыша будут опубликованы на сайте 8 декабря, 15 декабря, 22
                    декабря и 10 января
                </span>
            </div>
            <SnowDecorationMobile className={styles.footer__decoration_mobile} />
            <div className={styles.footerInfo}>
                <a
                    href="https://www.delivery-club.ru/promo_rules/NY%20with%20Coca-Cola.pdf?1638296035"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerInfo__rules}
                    onClick={() =>
                        sendEvent(
                            GA_MAP.externalLink(
                                'https://www.delivery-club.ru/promo_rules/NY%20with%20Coca-Cola.pdf?1638296035'
                            )
                        )
                    }
                >
                    Правила акции
                </a>
                <div className={styles.footerInfo__company}>
                    <span>ООО &quot;Деливери Клаб&quot; 3+</span>
                    <span>ОГРН 1097746360568, ИНН/КПП 7705891253/997750001</span>
                    <span>125315, г. Москва, Ленинградский проспект, д. 70, этаж 3</span>
                </div>
                <span className={styles.footerInfo__date}>© 2009–{new Date().getFullYear()}</span>
            </div>
        </footer>
    );
};

export default Footer;
