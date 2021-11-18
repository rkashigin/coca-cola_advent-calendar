import React, { useEffect } from 'react';

import Slide from '@mui/material/Slide';
import Button from '../Button/Button';

import Modal from '../Modal/Modal';
import PromoCode from '../PromoCode/PromoCode';

import { ReactComponent as Feat } from '../../assets/icons/Logo_ft.svg';
import { ReactComponent as Delivery } from '../../assets/icons/Logo_delivery.svg';
import { ReactComponent as Cola } from '../../assets/icons/Logo_cola.svg';

import styles from './Header.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MainPage = () => {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const app = document.querySelector('.App');
        app.style.filter = open ? 'blur(10px)' : '';
    }, [open]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <header className={styles.header}>
                {/* <div className={styles.header__logoWrap}> */}
                <div className={styles.header__logo}>
                    <img
                        className={styles.header__band}
                        src={require('../../assets/images/Header_band.png').default}
                        alt="band"
                    />
                    <div className={styles.header__brand}>
                        <Cola className={styles.header__logoCola} />
                        <Feat className={styles.header__Logofeat} />
                        <Delivery className={styles.header__logoDelivery} />
                    </div>
                </div>
                {/* </div> */}
                <h1 className={styles.header__title}>Погрузитесь в волшебную атмосферу </h1>
                <p className={styles.header__subTitle}>
                    C advent-календарем, мини-играми и приятными подарками
                </p>
                <Button content="Победители" className={styles.header__button_winners} />
                <Button
                    content="Мои промокоды"
                    onClick={handleClickOpen}
                    className={styles.header__button_promoCodes}
                />
                <img
                    className={styles.header__bandBottom}
                    src={require('../../assets/images/Header_band_bottom.png').default}
                    alt="band"
                />
                <Modal title="Мои промокоды" handleClose={handleClose} open={open}>
                    {PRONOCODES.map((el) => (
                        <PromoCode key={el.id} promoCodeText={el.title} promoCode={el.code} />
                    ))}
                </Modal>
            </header>
        </>
    );
};

export default MainPage;

const PRONOCODES = [
    {
        id: 1,
        title: '100 ₽ на доставку Delivery Club',
        code: 'DCCC20223'
    },
    {
        id: 2,
        title: '100 ₽ на доставку Delivery Club',
        code: 'SD1233131'
    }
];
