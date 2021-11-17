import React from 'react';
import classNames from 'classnames';

import { ReactComponent as SnowDecoration } from '../../assets/images/Footer_snow.svg';

import styles from './Footer.module.scss';

const Footer = () => {
	return (
		<div className={styles.footer}>
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
					src={require('../../assets/images/Header_band_bottom.png').default}
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
					Уникальный холодильник с запасом Coca-Cola
				 	и промокод 3 500 ₽ на заказы в ресторанах!
				</span>

				<img
					className={styles.footer__cardPrize_multiple}
					src={
						require('../../assets/images/Footer_card_cola_and_delivery.png').default
					}
					alt="Delivery and Coca-Cola"
				/>
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
					* Результаты розыгрыша будут опубликованына сайте 8 декабря, 15 декабря, 22
					декабря и 10 января
				</span>
			</div>
		</div>
	);
};

export default Footer;
