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
import { Riddle } from '../../games';
import config from '../../config';
import { useDay } from '../../hooks';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day10 = ({ setOpenedDay }) => {
    const { open, result, resultVisible, setResult, setScore, handleClose, handleRestart } = useDay(
        {
            setOpenedDay
        }
    );

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
                className={styles.popup}
            >
                <div className="gameWrapper">
                    <Game
                        handleClose={handleClose}
                        game={
                            <Riddle
                                riddle={config.references.riddles.day10.riddle}
                                setResult={setResult}
                                setScore={setScore}
                                day={10}
                            />
                        }
                        setResult={setResult}
                        test
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
                        <DialogTitle>Эти загадки не смогли вас одолеть! Поздравляем!</DialogTitle>
                    ) : (
                        <DialogTitle>
                            Праздничные загадки бывают весьма коварны и сложны
                        </DialogTitle>
                    )}
                    <DialogContent>
                        {result.status ? (
                            <>
                                {result.promoCode ? (
                                    <>
                                        <DialogContentText id="alert-dialog-slide-description">
                                            Наш подарок уже ждет вас!
                                        </DialogContentText>
                                        <PromoCode
                                            type="red"
                                            promoCode={result.promoCode}
                                            promoCodeText="Срок действия промокода 31.01.2022"
                                        />
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        ) : (
                            <DialogContentText id="alert-dialog-slide-description">
                                Они не всем по зубам. Но не расстраивайтесь! Наши загадки и правда
                                были очень хитрыми
                            </DialogContentText>
                        )}
                    </DialogContent>
                    <DialogActions>
                        {result.status ? (
                            <>
                                {result.promoCode && (
                                    <Button onClick={handleClose}>Заказать сейчас</Button>
                                )}
                                <Button className={styles.modalButton_return} onClick={handleClose}>
                                    В календарь
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={handleRestart}>Пройти тест еще раз</Button>

                                <Button onClick={handleClose}>В календарь</Button>
                            </>
                        )}
                    </DialogActions>
                </div>
            </Dialog>
        </>
    );
};

export default Day10;
