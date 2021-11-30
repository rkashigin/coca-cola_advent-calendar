/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import PromoCode from '../PromoCode/PromoCode';
import { useDay } from '../../hooks';
import Game from '../Game';
import { CatchItemGame } from '../../games';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day6 = ({ setOpenedDay }) => {
    const { open, result, resultVisible, setResult, handleClose, handleRestart } = useDay({
        setOpenedDay
    });

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={(_, reason) => {
                    if (reason === 'backdropClick') return;

                    handleClose();
                }}
                className={styles.popup}
                fullScreen
                fullWidth
            >
                <div className="gameWrapper">
                    <Game
                        handleClose={handleClose}
                        game={<CatchItemGame setResult={setResult} day={6} />}
                        fullScreen
                    />
                </div>
            </Dialog>
            <Dialog open={resultVisible} TransitionComponent={Transition} className={styles.popup}>
                <div className={styles.modal}>
                    <>
                        {result.status ? (
                            <img
                                className={styles.modalResult__img}
                                src={require('../../assets/images/Games/game_win.svg').default}
                                alt=""
                            />
                        ) : (
                            <img
                                className={classNames(
                                    styles.modalResult__img,
                                    styles.modalResult__img_resize
                                )}
                                src={require('../../assets/images/Games/game_loss.svg').default}
                                alt=""
                            />
                        )}
                    </>
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
                                        <a
                                            href="https://trk.mail.ru/c/lvg0b5?utm_source=coca-cola-land-2021-5&utm_medium=cola-card-2021-5&utm_campaign=ny2021-cola-5&utm_content=cola-land-2021-5"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.calendarModal__button}
                                        >
                                            Заказать сейчас
                                        </a>
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
                                <Button onClick={handleRestart}>Попробовать ещё раз</Button>
                                <Button onClick={handleClose}>В календарь</Button>
                            </>
                        )}
                    </DialogActions>
                </div>
            </Dialog>
        </>
    );
};

export default Day6;
