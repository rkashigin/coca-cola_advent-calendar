/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useMediaQuery } from 'react-responsive';

import config from '../../config';
import Adaptive from '../../helpers/Adaptive';
import Button from '../Button/Button';
import Game from '../Game';
import { ThreeInARowGame } from '../../games';
import { useDay } from '../../hooks';
import PromoCode from '../PromoCode/PromoCode';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day7 = ({ setOpenedDay }) => {
    const isDesktop = useMediaQuery(Adaptive.isDesktop);
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
                                        {isDesktop && (
                                            <a
                                                href={
                                                    isDesktop
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
                                    <Button
                                        className={styles.calendarDay__button}
                                        onClick={handleClose}
                                    >
                                        В календарь
                                    </Button>
                                )}
                            </>
                        ) : (
                            <>
                                <Button
                                    className={styles.calendarDay__button_green}
                                    onClick={handleRestart}
                                >
                                    Играть ещё раз
                                </Button>
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

export default Day7;
