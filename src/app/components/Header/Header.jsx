import React from 'react';

import { ReactComponent as Cola } from '../../assets/icons/Logo_cola.svg';
import { ReactComponent as Delivery } from '../../assets/icons/Logo_delivery.svg';

import styles from './Header.module.scss';

const MainPage = () => {
	return (
		<header className={styles.header}>
			<div className={styles.header__logo}>
				<img className={styles.header__band} src={require('../../assets/images/Header_band.png').default} alt="band" />
				<div className={styles.header__logoWrap}>
					<Cola />
					<span className={styles.header__feat} />
					<Delivery />
				</div>
			</div>
			<h1 className={styles.header__title}>Погрузитесь в волшебную атмосферу </h1>
			<p className={styles.header__subTitle}>C advent-календарем, мини-играми и 
                приятными подарками
			</p>
			<img className={styles.header__bandBottom} src={require('../../assets/images/Header_band_bottom.png').default} alt="band" />
		</header>
	);
};

export default MainPage;
