/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import PromoCode from '../PromoCode/PromoCode';

import Game from '../Game';
import { CatchItemGame } from '../../games';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day6 = ({ setOpenedDay }) => {
    const [open, setOpen] = React.useState(true);
    const [result, setResult] = React.useState({});
    const [resultVisible, setResultVisible] = React.useState(false);

    const handleClose = () => {
        setResultVisible(false);
        setResult({});
        setResult(false);
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
                    game={<CatchItemGame setResult={setResult} />}
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
                    {result.status ? (
                        <DialogTitle>Поздравляем!</DialogTitle>
                    ) : (
                        <DialogTitle>
                            Как жаль, вы не успели поймать все подарки вовремя!
                        </DialogTitle>
                    )}
                    <DialogContent>
                        {result.status ? (
                            <>
                                {result.promoCode ? (
                                    <>
                                        <DialogContentText id="alert-dialog-slide-description">
                                            Вы успели поймать все подарки вовремя! Приз уже ждет
                                            вас!
                                        </DialogContentText>
                                        <PromoCode
                                            type="red"
                                            promoCode={result.promoCode}
                                            promoCodeText="Срок действия промокода 31.01.2022"
                                        />
                                    </>
                                ) : (
                                    <DialogContentText id="alert-dialog-slide-description">
                                        Вы успели поймать все подарки вовремя! Предновогодняя суета
                                        вам нипочём!
                                    </DialogContentText>
                                )}
                            </>
                        ) : (
                            <></>
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
                                    <Button
                                        className={styles.modalButton_return}
                                        onClick={handleClose}
                                    >
                                        В календарь
                                    </Button>
                                )}
                            </>
                        ) : (
                            <>
                                <Button onClick={handleClose}>Попробовать ещё раз</Button>
                                <Button onClick={handleClose}>В календарь</Button>
                            </>
                        )}
                    </DialogActions>
                </div>
            </Dialog>
        </Dialog>
    );
};

export default Day6;
