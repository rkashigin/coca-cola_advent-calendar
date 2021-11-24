import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import CalendarDay from '../CalendarDay/CalendarDay';

import styles from './Calendar.module.scss';
import { Day10, Day11, Day2, Day3, Day4, Day5, Day6, Day7, Day8, Day9 } from '../Days';

const Calendar = () => {
    const [openedDay, setOpenedDay] = React.useState(0);

    useEffect(() => {
        const app = document.querySelector('.App');
        app.style.filter = openedDay ? 'blur(10px)' : '';
    }, [openedDay]);

    const handleOpenDay = (day) => setOpenedDay(day);

    return (
        <>
            <div className={styles.calendar}>
                {DATES.map((el) => (
                    <CalendarDay
                        key={el.day}
                        id={el.day}
                        date={el.day}
                        img={el.img}
                        className={styles[`calendarDay_${el.day}`]}
                        modalImg={el.modalImg}
                        title={el.title}
                        intro={el.intro}
                        promoCode={el.promoCode}
                        type={el.type}
                        handleOpenDay={() => handleOpenDay(el.day)}
                        openedDay={openedDay}
                    />
                ))}
                <img
                    className={styles.calendar__bandBottom}
                    src={require('../../assets/images/Calendar/Calendar_band_bottom.png').default}
                    alt="band"
                />
            </div>
            {openedDay &&
                ReactDOM.createPortal(
                    React.cloneElement(DAYS[openedDay], { setOpenedDay }),
                    document.body
                )}
        </>
    );
};

export default Calendar;

const DAYS = {
    2: <Day2 />,
    3: <Day3 />,
    4: <Day4 />,
    5: <Day5 />,
    6: <Day6 />,
    7: <Day7 />,
    8: <Day8 />,
    9: <Day9 />,
    10: <Day10 />,
    11: <Day11 />
};

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
        intro: 'Чтобы поближе познакомиться с главным призом нашего календаря, нужно сначала его найти. Отыщите наш волшебный холодильник за пять минут в этой предпраздничной суматохе',
        type: 'game'
    },
    {
        day: 3,
        img: require('../../assets/images/Calendar/3day.png').default,
        modalImg: require('../../assets/images/Games/game_2_day.png').default,
        title: 'Дед Мороз — фигура значительная, ведь он олицетворяет собой главный праздник года',
        intro: 'Но хорошо ли вы его знаете? Давайте проверим!',
        type: 'test'
    },
    {
        day: 4,
        img: require('../../assets/images/Calendar/4day.png').default,
        modalImg: require('../../assets/images/Games/game_2_day.png').default,
        title: 'Подготовка к праздникам может быть не только приятной, но и полезной!',
        intro: 'Прокачайте память с нашей новогодней мини-игрой. Найдите пару для каждой картинки, но помните — карточки закрываются при открытии новых, а время поиска ограничено',
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
