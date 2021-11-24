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

import PromoCode from '../PromoCode/PromoCode';

import { ReactComponent as CopyIcon } from '../../assets/icons/Modal_promoCode_button_copy.svg';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day3 = () => {
    const [open, setOpen] = React.useState(true);
    const [result, setResult] = React.useState(true);

    const promocode = 'DCCC2022';
    // const score = 5;

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
            {result ? (
                <img
                    className={styles.modalResult__img}
                    src={require('../../assets/images/Games/game_1_day.png').default}
                    alt=""
                />
            ) : (
                <img
                    className={styles.modalResult__img}
                    src={require('../../assets/images/Games/game_2_day.png').default}
                    alt=""
                />
            )}
            <div className={styles.modal}>
                {result ? (
                    <DialogTitle>Вы настоящий знаток Деда Мороза!</DialogTitle>
                ) : (
                    <DialogTitle>
                        Кажется, вам нужно немного подтянуть свои познания о Деде Морозе. Не
                        переживайте!
                    </DialogTitle>
                )}
                <DialogContent>
                    {result ? (
                        <>
                            <DialogContentText id="alert-dialog-slide-description">
                                Он это ценит, поэтому не оставит вас без внимания на этих
                                праздниках!
                            </DialogContentText>
                            {/* <div
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
                            </div> */}
                            <PromoCode
                                promoCode={promocode}
                                promoCodeText="Срок действия промокода 31.01.2022"
                            />
                        </>
                    ) : (
                        <DialogContentText id="alert-dialog-slide-description">
                            С нашим advent-календарем вы еще много узнаете о новогодних традициях и
                            символах!
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    {result ? (
                        <>
                            <Button onClick={handleClose}>Заказать сейчас</Button>
                            <Button onClick={handleClose}>В календарь</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={handleClose}>Пройти тест еще раз</Button>
                            <Button onClick={handleClose}>В календарь</Button>
                        </>
                    )}
                </DialogActions>
            </div>
        </Dialog>
    );
};

export default Day3;
