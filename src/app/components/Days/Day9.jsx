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

export const Day9 = () => {
    const [open, setOpen] = React.useState(true);
    const [result, setResult] = React.useState(true);

    const promocode = 'DCCC2022';

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
                    src={require('../../assets/images/Games/game_won.png').default}
                    alt=""
                />
            ) : (
                <img
                    className={styles.modalResult__img}
                    src={require('../../assets/images/Games/game_lost.png').default}
                    alt=""
                />
            )}
            <div className={styles.modal}>
                {result ? (
                    <DialogTitle>Уолли нашелся!</DialogTitle>
                ) : (
                    <DialogTitle>Вы очень постарались, чтобы найти Уолли!</DialogTitle>
                )}
                <DialogContent>
                    {result ? (
                        <DialogContentText id="alert-dialog-slide-description">
                            Вы отлично справились с заданием!
                        </DialogContentText>
                    ) : (
                        <>
                            <DialogContentText id="alert-dialog-slide-description">
                                Вот Ваш приз за старания!
                            </DialogContentText>
                            <p className={styles.modal__promoText}>
                                <img
                                    className={styles.modal__promoIcon}
                                    src={require('../../assets/icons/ivi.svg').default}
                                    alt=""
                                />
                                Сертификат в онлайн-кинотеатр IVI
                            </p>
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
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    {result ? (
                        <Button onClick={handleClose}>Увидимся завтра!</Button>
                    ) : (
                        <>
                            <Button onClick={handleClose}>Попробовать ещё раз</Button>
                            <Button onClick={handleClose}>В календарь</Button>
                        </>
                    )}
                </DialogActions>
            </div>
        </Dialog>
    );
};
