import React from 'react';

import CalendarDay from '../CalendarDay/CalendarDay';

import styles from './Calendar.module.scss';

const Calendar = () => {
    const [open, setOpen] = React.useState(<></>);
    const handleClickOpen = (el) => {
        setOpen(el);
    };
    return (
        <>
            <div className={styles.calendar}>
                {DATES.map((el) => (
                    <CalendarDay
                        id={el.day}
                        date={el.day}
                        img={el.img}
                        className={styles[`calendarDay_${el.day}`]}
                        modalImg={el.modalImg}
                        title={el.title}
                        intro={el.intro}
                        promoCode={el.promoCode}
                        type={el.type}
                    />
                ))}
            </div>
        </>
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
        type: 'promoCode'
    },
    {
        day: 2,
        img: require('../../assets/images/Calendar/2day.png').default,
        modalImg: require('../../assets/images/Games/game_2_day.png').default,
        title: 'Двигаемся дальше!',
        intro: 'Сегодня Уолли не сидится на месте, он вечно куда-то пропадает. Отыщите Уолли за пять минут в этой предпраздничной суматохе',
        type: 'game'
    },
    {
        day: 3,
        img: require('../../assets/images/Calendar/3day.png').default,
        modalImg: require('../../assets/images/Games/game_2_day.png').default,
        title: 'Тест про ДМ',
        intro: 'Тест про Деда Мороза',
        type: 'test'
    },
    {
        day: 4,
        img: require('../../assets/images/Calendar/4day.png').default,
        modalImg: require('../../assets/images/Games/game_2_day.png').default,
        title: 'Подготовка к праздникам может быть не только приятной, но и полезной!',
        intro: 'Прокачайте память с нашей новогодней мини-игрой. Найдите пару для каждой картинки, но помните — карточки закрываются при открытии новых',
        type: 'game'
    },
    {
        day: 5,
        img: require('../../assets/images/Calendar/5day.png').default,
        modalImg: require('../../assets/images/Games/game_2_day.png').default,
        title: 'Тест правда или миф',
        intro: 'Тест правда или миф',
        type: 'test'
    },
    {
        day: 6,
        img: require('../../assets/images/Calendar/6day.png').default,
        modalImg: require('../../assets/images/Games/game_2_day.png').default,
        title: 'В предновогодней суете сложно все успеть, но можно потренироваться у нас в мини-игре',
        intro: 'Ловите тележкой как можно больше подарков и набирайте очки. Чем больше очков — тем круче призы!',
        type: 'game'
    },
    {
        day: 7,
        img: require('../../assets/images/Calendar/7day.png').default,
        modalImg: require('../../assets/images/Games/game_2_day.png').default,
        title: 'Порядок важен даже во время праздников, хотя за ним и непросто уследить',
        intro: 'Собирайте новогодние атрибуты по три в ряд, но помните — время ограничено, а нужно столько всего сделать!',
        type: 'game'
    },
    {
        day: 8,
        img: require('../../assets/images/Calendar/8day.png').default,
        modalImg: require('../../assets/images/Games/game_2_day.png').default,
        title: 'Дед Мороз уже заканчивает составлять списки подарков!',
        intro: 'Поэтому самое время выяснить, в какой же список вы попадете.',
        type: 'test'
    },
    {
        day: 9,
        img: require('../../assets/images/Calendar/9day.png').default,
        modalImg: require('../../assets/images/Games/game_2_day.png').default,
        title: 'Двигаемся дальше!',
        intro: 'Сегодня Уолли не сидится на месте, он вечно куда-то пропадает. Отыщите Уолли за пять минут в этой предпраздничной суматохе',
        type: 'game'
    },
    {
        day: 10,
        img: require('../../assets/images/Calendar/10day.png').default,
        modalImg: require('../../assets/images/Games/game_2_day.png').default,
        title: 'Загадки про Новый Год',
        intro: 'Загадки про Новый Год',
        type: 'test'
    },
    {
        day: 11,
        img: require('../../assets/images/Calendar/11day.png').default,
        modalImg: require('../../assets/images/Games/game_2_day.png').default,
        title: 'Новогодняя открытка',
        intro: 'Новогодняя открытка',
        type: 'postCard'
    },
    {
        day: 12,
        img: require('../../assets/images/Calendar/12day.png').default,
        modalImg: require('../../assets/images/Games/game_12_day.png').default,
        title: 'Давайте начнем наше новогоднее путешествие!',
        intro: 'Задание этого дня совсем простое: сделайте заказ в Delivery Club на любую сумму с нашим волшебным промокодом на Coca-Cola за 1 ₽',
        promoCode: 'DCCC2022',
        type: 'promoCode'
    }
];
