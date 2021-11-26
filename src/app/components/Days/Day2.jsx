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

import styles from '../CalendarDay/CalendarDay.module.scss';
import Game from '../Game';
import { WhereIsGame } from '../../games';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day2 = ({ setOpenedDay }) => {
    const [open, setOpen] = React.useState(true);
    const [result, setResult] = React.useState({});
    const [resultVisible, setResultVisible] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        setResultVisible(false);
    };

    React.useEffect(() => {
        let timer;
        const app = document.querySelector('.App');
        app.style.filter = open ? 'blur(10px)' : '';

        if (!open) {
            timer = setTimeout(() => setOpenedDay(0), 1000);
        }

        return () => clearTimeout(timer);
    }, [open]);

    React.useEffect(() => {
        if (Object.keys(result).length) {
            setResultVisible(true);

            const game = document.querySelector('.gameWrapper');
            game.style.filter = result ? 'blur(10px)' : '';
            game.style.background = result ? 'rgba(0, 0, 0, 0.8)' : '';
        }
    }, [result]);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            className={styles.popup}
            fullScreen
            fullWidth
        >
            <div className="gameWrapper">
                <Game
                    handleClose={handleClose}
                    game={<WhereIsGame gameVariant="easy" setResult={setResult} />}
                    setResult={setResult}
                    fullScreen
                />
            </div>
            <Dialog
                open={resultVisible}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                className={styles.popup}
            >
                {result.status ? (
                    <img
                        className={styles.modalResult__img}
                        src={require('../../assets/images/Games/game_won.png').default}
                        alt=""
                    />
                ) : (
                    <>
                        {result.promoCode ? (
                            <img
                                className={styles.modalResult__img}
                                src={require('../../assets/images/Games/game_lost.png').default}
                                alt=""
                            />
                        ) : (
                            <img
                                className={classNames(
                                    styles.modalResult__img,
                                    styles.modalResult__img_resize
                                )}
                                src={require('../../assets/images/Calendar/3day.svg').default}
                                alt=""
                            />
                        )}
                    </>
                )}
                <div className={styles.modal}>
                    {result.status ? (
                        <DialogTitle>Холодильник нашелся, поздравляем!</DialogTitle>
                    ) : (
                        <>
                            {result.promoCode ? (
                                <DialogTitle>
                                    Вы очень постарались! Вот Ваш приз за усердие!
                                </DialogTitle>
                            ) : (
                                <DialogTitle>Проиграли</DialogTitle>
                            )}
                        </>
                    )}
                    <DialogContent>
                        {result.status ? (
                            <>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Вы отлично справились с заданием!
                                </DialogContentText>
                                {result.promoCode && (
                                    <PromoCode
                                        type="red"
                                        promoCode={result.promoCode}
                                        promoCodeName="45 дней подписки онлайн-кинотеатра IVI"
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                {result.promoCode ? (
                                    <>
                                        <DialogContentText id="alert-dialog-slide-description">
                                            Вот Ваш приз за старания!
                                        </DialogContentText>
                                        <PromoCode
                                            type="red"
                                            promoCode={result.promoCode}
                                            promoCodeName="45 дней подписки онлайн-кинотеатра IVI"
                                        />
                                    </>
                                ) : (
                                    <DialogContentText id="alert-dialog-slide-description">
                                        Попробуйте ещё раз
                                    </DialogContentText>
                                )}
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        {result.status ? (
                            <>
                                {result.promoCode ? (
                                    <>
                                        <Button onClick={handleClose}>Заказать сейчас</Button>
                                        <Button onClick={handleClose}>В календарь</Button>
                                    </>
                                ) : (
                                    <Button onClick={handleClose}>Увидимся завтра!</Button>
                                )}
                            </>
                        ) : (
                            <>
                                {result.promoCode ? (
                                    <>
                                        <Button onClick={handleClose}>Заказать сейчас</Button>
                                        <Button onClick={handleClose}>В календарь</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={handleClose}>Попробовать еще раз</Button>
                                        <Button onClick={handleClose}>В календарь</Button>
                                    </>
                                )}
                            </>
                        )}
                    </DialogActions>
                </div>
            </Dialog>
        </Dialog>
    );
};

export default Day2;
