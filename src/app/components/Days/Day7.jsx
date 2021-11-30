/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import Game from '../Game';
import { ThreeInARowGame } from '../../games';
import { useDay } from '../../hooks';
import PromoCode from '../PromoCode/PromoCode';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day7 = ({ setOpenedDay }) => {
    const { open, result, resultVisible, setScore, setResult, handleClose, handleRestart } = useDay(
        {
            setOpenedDay
        }
    );

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
            >
                <div className="gameWrapper">
                    <Game
                        handleClose={handleClose}
                        game={<ThreeInARowGame setResult={setResult} setScore={setScore} day={7} />}
                    />
                </div>
            </Dialog>
            <Dialog
                open={resultVisible}
                TransitionComponent={Transition}
                className={styles.popup}
                onBackdropClick={() => {}}
            >
                {result.status ? (
                    <img
                        className={styles.modalResult__img_result}
                        src={require('../../assets/images/Games/game_win.svg').default}
                        alt=""
                    />
                ) : (
                    <img
                        className={styles.modalResult__img}
                        src={require('../../assets/images/Games/game_loss.svg').default}
                        alt=""
                    />
                )}
                <div className={styles.modal}>
                    {result.status ? (
                        <>
                            {result.promoCode ? (
                                <>
                                    <DialogTitle>Вот это скорость!</DialogTitle>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        Мы просто не можем оставить вас без подарка!
                                    </DialogContentText>
                                    <PromoCode
                                        type="red"
                                        promoCode={result.promoCode}
                                        promoCodeText="Срок действия промокода 31.01.2022"
                                    />
                                </>
                            ) : (
                                <>
                                    <DialogTitle>Поздравляем!</DialogTitle>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        Вы прекрасно справились с заданием! Ваша скорость выше
                                        всяких похвал!
                                    </DialogContentText>
                                </>
                            )}
                        </>
                    ) : (
                        <DialogTitle>
                            Как жаль, время вышло! Но мы знаем, что вы очень старались!
                        </DialogTitle>
                    )}
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
                                <Button onClick={handleRestart}>Играть ещё раз</Button>
                                <Button onClick={handleClose}>В календарь</Button>
                            </>
                        )}
                    </DialogActions>
                </div>
            </Dialog>
        </>
    );
};

export default Day7;
