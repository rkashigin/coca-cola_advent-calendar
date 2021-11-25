import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import CalendarDay from '../CalendarDay/CalendarDay';

import styles from './Calendar.module.scss';
import { Day10, Day11, Day2, Day3, Day4, Day5, Day6, Day7, Day8, Day9 } from '../Days';

const Calendar = () => {
    const [openedDay, setOpenedDay] = React.useState(0);
    // состояние для активного дня
    const [currentDay, setCurrentDay] = React.useState(false);
    // состояние для дня, который прошел
    const [pastDay, setPastDay] = React.useState(false);

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
                        className={classNames(styles[`calendarDay_${el.day}`], {
                            [styles.calendarDay_current]: currentDay,
                            [styles.calendarDay_pastDay]: pastDay
                        })}
                        modalImg={el.modalImg}
                        classNameImg={classNames(styles[`calendarDay_modalImg_${el.day}`])}
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
        img: require('../../assets/images/Calendar/1day.svg').default,
        modalImg: require('../../assets/images/Calendar/1day.svg').default,
        title: 'Давайте начнем наше новогоднее путешествие!',
        intro: 'Задание этого дня совсем простое: сделайте заказ в Delivery Club на любую сумму с нашим волшебным промокодом на Coca-Cola за 1 ₽',
        promoCode: 'DCCC2022',
        type: 'promoCode'
    },
    {
        day: 2,
        img: require('../../assets/images/Calendar/2day.svg').default,
        modalImg: require('../../assets/images/Calendar/2day.svg').default,
        title: 'Двигаемся дальше!',
        intro: 'Чтобы поближе познакомиться с главным призом нашего календаря, нужно сначала его найти. Отыщите наш волшебный холодильник за пять минут в этой предпраздничной суматохе',
        type: 'game'
    },
    {
        day: 3,
        img: require('../../assets/images/Calendar/3day.svg').default,
        modalImg: require('../../assets/images/Calendar/3day.svg').default,
        title: 'Дед Мороз — фигура значительная, ведь он олицетворяет собой главный праздник года',
        intro: 'Но хорошо ли вы его знаете? Давайте проверим!',
        type: 'test'
    },
    {
        day: 4,
        img: require('../../assets/images/Calendar/4day.svg').default,
        modalImg: require('../../assets/images/Calendar/4day.svg').default,
        title: 'Подготовка к праздникам может быть не только приятной, но и полезной!',
        intro: 'Прокачайте память с нашей новогодней мини-игрой. Найдите пару для каждой картинки, но помните — карточки закрываются при открытии новых, а время поиска ограничено',
        type: 'game'
    },
    {
        day: 5,
        img: require('../../assets/images/Calendar/5day.svg').default,
        modalImg: require('../../assets/images/Calendar/5day.svg').default,
        title: 'Coca-Cola пробовали все!',
        intro: 'Это напиток ассоциируется с новогодними праздниками у людей по всему миру. Но много ли вы знаете об истории этого напитка? Сейчас узнаем!',
        type: 'test'
    },
    {
        day: 6,
        img: require('../../assets/images/Calendar/6day.svg').default,
        modalImg: require('../../assets/images/Calendar/6day.svg').default,
        title: 'В предновогодней суете сложно все успеть, но можно потренироваться у нас в мини-игре',
        intro: 'Поймайте тележкой как можно больше подарков за одну минуту',
        type: 'game'
    },
    {
        day: 7,
        img: require('../../assets/images/Calendar/7day.svg').default,
        modalImg: require('../../assets/images/Calendar/7day.svg').default,
        title: 'Порядок важен даже во время праздников, хотя за ним и непросто уследить',
        intro: 'Собирайте новогодние атрибуты по три в ряд, но помните — время ограничено, а нужно столько всего сделать!',
        type: 'game'
    },
    {
        day: 8,
        img: require('../../assets/images/Calendar/8day.svg').default,
        modalImg: require('../../assets/images/Calendar/8day.svg').default,
        title: 'Дед Мороз уже заканчивает составлять списки подарков!',
        intro: 'Поэтому самое время выяснить, в какой же список вы попадете.',
        type: 'test'
    },
    {
        day: 9,
        img: require('../../assets/images/Calendar/9day.svg').default,
        modalImg: require('../../assets/images/Calendar/9day.svg').default,
        title: 'Кажется, наш главный приз снова потерялся!',
        intro: 'Помогите найти наш волшебный холодильник, но помните, что время ограничено, а сделать это теперь гораздо сложнее',
        type: 'game'
    },
    {
        day: 10,
        img: require('../../assets/images/Calendar/10day.svg').default,
        modalImg: require('../../assets/images/Calendar/10day.svg').default,
        title: 'Помните детские утренники, ёлку и загадки от Деда Мороза?',
        intro: 'Вот мы и решили проверить, справитесь ли вы с ними сейчас. Каждая загадка имеет четыре вариант ответов, но только один правильный. И не все так просто, как может показаться на первый взгляд',
        type: 'test'
    },
    {
        day: 11,
        img: require('../../assets/images/Calendar/11day.svg').default,
        modalImg: require('../../assets/images/Calendar/11day.svg').default,
        title: 'Праздничными открытками сложно кого-то удивить',
        intro: 'Они могут даже казаться пережитком прошлого. Но наши открытки наполнены только самыми теплыми и полезными пожеланиями. Отправьте их своим друзьям и близким, чтобы передать им кусочек новогоднего настроения',
        type: 'postCard'
    },
    {
        day: 12,
        img: require('../../assets/images/Calendar/12day.svg').default,
        modalImg: require('../../assets/images/Calendar/12day.svg').default,
        title: 'Наш advent-календарь подходит к концу!',
        intro: 'Спасибо, что прошли его вместе с нами. Вы успешно справлялись со всеми нашими играми и загадками. Вот ваше финальное задание. Закажите три Coca-Cola в ресторанах Delivery Club по нашему особому промокоду до 30 декабря и участвуйте в розыгрыше наших главных призов!',
        promoCode: 'DCCC2022',
        type: 'promoCode'
    }
];
