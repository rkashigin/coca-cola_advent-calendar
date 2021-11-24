/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import classNames from 'classnames';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { ReactComponent as CopyIcon } from '../../assets/icons/Modal_promoCode_button_copy.svg';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day8 = () => {
    const [open, setOpen] = React.useState(true);
    const [result, setResult] = React.useState('A');

    const promocode = 'DCCC2022';
    const score = 5;

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
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            className={styles.popup}
        >
            <img
                className={styles.modalResult__img}
                src={require('../../assets/images/Games/game_2_day.png').default}
                alt=""
            />
            <div className={styles.modal}>
                {result === 'A' && (
                    <DialogTitle>
                        Вы мечтательны и несете в себе эту черту на протяжении всей жизни
                    </DialogTitle>
                )}
                {result === 'B' && (
                    <DialogTitle>Вам присущи особенное восприятие мира и тонкий вкус</DialogTitle>
                )}
                {result === 'C' && (
                    <DialogTitle>
                        Возможно, серые будни и рутина захватили вас с головой
                    </DialogTitle>
                )}
                {result === 'D' && (
                    <DialogTitle>
                        Для вас очень важны праздники, о чем Дедушка Мороз знает
                    </DialogTitle>
                )}
                <DialogContent>
                    {result === 'A' && (
                        <DialogContentText id="alert-dialog-slide-description">
                            Это прекрасное качество, которое Дедушка Мороз до глубины души любит и
                            ценит. Вы попадете в список, где эльфы, феи и магические существа, а
                            подарки удивят своим волшебством
                        </DialogContentText>
                    )}
                    {result === 'B' && (
                        <DialogContentText id="alert-dialog-slide-description">
                            Поэтому Дедушка Мороз внес вас в список ценителей красоты и изящества,
                            где и сюрпризы соответствующие
                        </DialogContentText>
                    )}
                    {result === 'C' && (
                        <DialogContentText id="alert-dialog-slide-description">
                            Дедушка Мороз расстраивается, когда это происходит. Но для таких людей у
                            него подготовлен особенный список, где подарки наполнены волшебством
                            праздника. Это тайная древняя магия, которая возвращает в людей веру в
                            новогодние чудеса
                        </DialogContentText>
                    )}
                    {result === 'D' && (
                        <DialogContentText id="alert-dialog-slide-description">
                            Он внесет вас в самый скорый список, чтобы подарки и новогоднее
                            настроение не заставили себя ждать. Вы весь год старались, поэтому
                            заслужили немного отдыха и волшебства
                        </DialogContentText>
                    )}
                    <div
                        name="promoCode"
                        type="button"
                        value={promocode}
                        className={styles.modal__promoCode}
                        // onChange={changeHandler}
                    >
                        {promocode}
                        <button className={styles.promoCode__button} type="button">
                            <CopyIcon className={styles.promoCode__button_copy} />
                        </button>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Заказать сейчас</Button>
                    <Button onClick={handleClose}>В календарь</Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};

export default Day8;
