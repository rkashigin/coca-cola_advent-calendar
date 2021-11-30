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
import Game from '../Game';
import { Quiz } from '../../games';
import config from '../../config';
import { useDay } from '../../hooks';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day3 = ({ setOpenedDay }) => {
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
                onClose={handleClose}
                className={styles.popup}
            >
                <div className="gameWrapper">
                    <Game
                        handleClose={handleClose}
                        game={
                            <Quiz
                                quiz={config.references.quizes.day3.quiz}
                                setResult={setResult}
                                setScore={setScore}
                                day={3}
                            />
                        }
                        setResult={setResult}
                        test
                    />
                </div>
            </Dialog>
            <Dialog open={resultVisible} TransitionComponent={Transition} className={styles.popup}>
                <div className={styles.modal}>
                    <>
                        {result.status ? (
                            <img
                                className={styles.modalResult__img_result}
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
                        <DialogTitle>Вы настоящий знаток Деда Мороза!</DialogTitle>
                    ) : (
                        <DialogTitle>
                            Кажется, вам нужно немного подтянуть свои познания о Деде Морозе. Не
                            переживайте!
                        </DialogTitle>
                    )}
                    <DialogContent>
                        {result.status ? (
                            <>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Он это ценит, поэтому не оставит вас без внимания на этих
                                    праздниках!
                                </DialogContentText>
                                {result.promoCode && (
                                    <PromoCode
                                        type="red"
                                        promoCode={result.promoCode}
                                        promoCodeText="Срок действия промокода 31.01.2022"
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                <DialogContentText id="alert-dialog-slide-description">
                                    С нашим advent-календарем вы еще много узнаете о новогодних
                                    традициях и символах!
                                </DialogContentText>
                                {result.promoCode && (
                                    <PromoCode
                                        type="red"
                                        promoCode={result.promoCode}
                                        promoCodeText="Срок действия промокода 31.01.2022"
                                    />
                                )}
                            </>
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
                                {result.promoCode ? (
                                    <Button onClick={handleClose}>Заказать сейчас</Button>
                                ) : (
                                    <Button onClick={handleRestart}>Пройти тест еще раз</Button>
                                )}
                                <Button onClick={handleClose}>В календарь</Button>
                            </>
                        )}
                    </DialogActions>
                </div>
            </Dialog>
        </>
    );
};

export default Day3;
