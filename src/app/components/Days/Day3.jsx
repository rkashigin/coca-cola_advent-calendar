/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useMediaQuery } from 'react-responsive';

import config from '../../config';
import Adaptive from '../../helpers/Adaptive';
import Button from '../Button/Button';
import PromoCode from '../PromoCode/PromoCode';
import Game from '../Game';
import { Quiz } from '../../games';
import { useDay } from '../../hooks';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day3 = ({ setOpenedDay }) => {
    const isMobile = useMediaQuery(Adaptive.isMobile);
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
                                {!isMobile && result.promoCode && (
                                    <a
                                        href={
                                            !isMobile
                                                ? config.references.defaultOrderLinkDesktop
                                                : config.references.defaultOrderLinkMobile
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.calendarModal__button}
                                    >
                                        Заказать сейчас
                                    </a>
                                )}
                                <Button
                                    className={styles.calendarDay__button}
                                    onClick={handleClose}
                                >
                                    В календарь
                                </Button>
                            </>
                        ) : (
                            <>
                                {result.promoCode ? (
                                    <>
                                        {!isMobile && (
                                            <a
                                                href={
                                                    !isMobile
                                                        ? config.references.defaultOrderLinkDesktop
                                                        : config.references.defaultOrderLinkMobile
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.calendarModal__button}
                                            >
                                                Заказать сейчас
                                            </a>
                                        )}
                                    </>
                                ) : (
                                    <Button
                                        className={styles.calendarDay__button_green}
                                        onClick={handleRestart}
                                    >
                                        Пройти тест еще раз
                                    </Button>
                                )}
                                <Button
                                    className={styles.calendarDay__button}
                                    onClick={handleClose}
                                >
                                    В календарь
                                </Button>
                            </>
                        )}
                    </DialogActions>
                </div>
            </Dialog>
        </>
    );
};

export default Day3;
