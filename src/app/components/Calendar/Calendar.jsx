import React from 'react';

import CalendarDay from '../CalendarDay/CalendarDay';

import styles from './Calendar.module.scss';

const Calendar = () => {
	return (
		<div className={styles.calendar}>

			{DATES.map((el) => (
				<CalendarDay 
					id={el.day}
					date={el.day}
					img={el.img}
					className={styles[`calendarDay_${el.day}`]}
				/>
			))}
		</div>
	);
};

export default Calendar;

const DATES = [
	{
		day: 1,
		img: require('../../assets/images/Calendar/1day.png').default,
		modalImg: require('../../assets/images/Games/game_1_day.png').default,
		title: 'Давайте начнем наше новогоднее путешествие!',
		intro: 'Задание этого дня совсем простое: сделайте заказ в Delivery Club на любую сумму с нашим волшебным промокодом на Coca-Cola за 1 ₽',
		promoCode: 'DCCC2022',
		buttonText: {
			step1: 'Заказать сейчас',
			step2: 'В календарь'
		}
	},
	{
		day: 2,
		img: require('../../assets/images/Calendar/2day.png').default
	},
	{
		day: 3,
		img: require('../../assets/images/Calendar/3day.png').default
	},
	{
		day: 4,
		img: require('../../assets/images/Calendar/4day.png').default
	},
	{
		day: 5,
		img: require('../../assets/images/Calendar/5day.png').default
	},
	{
		day: 6,
		img: require('../../assets/images/Calendar/6day.png').default
	},
	{
		day: 7,
		img: require('../../assets/images/Calendar/7day.png').default
	},
	{
		day: 8,
		img: require('../../assets/images/Calendar/8day.png').default
	},
	{
		day: 9,
		img: require('../../assets/images/Calendar/9day.png').default
	},
	{
		day: 10,
		img: require('../../assets/images/Calendar/10day.png').default
	},
	{
		day: 11,
		img: require('../../assets/images/Calendar/11day.png').default
	},
	{
		day: 12,
		img: require('../../assets/images/Calendar/12day.png').default
	}
];
