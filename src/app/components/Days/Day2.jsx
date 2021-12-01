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
import Button from '../Button/Button';

import PromoCode from '../PromoCode/PromoCode';
import InfoPromoCode from '../InfoPromoCode/InfoPromoCode';
import Game from '../Game';
import { WhereIsGame } from '../../games';
import { useDay } from '../../hooks';
import config from '../../config';
import Adaptive from '../../helpers/Adaptive';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day2 = ({ setOpenedDay }) => {
    const isDesktop = useMediaQuery(Adaptive.isDesktop);
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
                <Game
                    handleClose={handleClose}
                    game={<WhereIsGame gameVariant="easy" setResult={setResult} day={2} />}
                    setResult={setResult}
                    fullScreen
                    disableStyles
                />
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
                                        className={styles.calendarDay__button_green}
                                        onClick={handleClose}
                                    >
                                        Увидимся завтра!
                                    </Button>
                                )}
                            </>
                        ) : (
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
                                    <>
                                        <Button
                                            className={styles.calendarDay__button_green}
                                            onClick={handleRestart}
                                        >
                                            Попробовать еще раз
                                        </Button>
                                        <Button
                                            className={styles.calendarDay__button}
                                            onClick={handleClose}
                                        >
                                            В календарь
                                        </Button>
                                    </>
                                )}
                            </>
                        )}
                    </DialogActions>
                    {result.promoCode && <InfoPromoCode />}
                </div>
            </Dialog>
        </>
    );
};

export default Day2;
