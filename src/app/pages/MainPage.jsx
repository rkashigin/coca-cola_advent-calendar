import React from 'react';

import Header from '../components/Header/Header';
import Calendar from '../components/Calendar/Calendar';

import styles from './MainPage.module.scss';

const MainPage = () => {
	return (
		<main>
			<Header />
			<Calendar />
		</main>
	);
};

export default MainPage;
