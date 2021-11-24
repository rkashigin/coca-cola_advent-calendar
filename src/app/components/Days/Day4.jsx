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

import { ReactComponent as CopyIcon } from '../../assets/icons/Modal_promoCode_button_copy.svg';

import styles from '../CalendarDay/CalendarDay.module.scss';
import Game from '../Game';
import { MemoryGame } from '../../games';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day4 = ({ setOpenedDay }) => {
    const [open, setOpen] = React.useState(true);
    const [result, setResult] = React.useState(false);
    const [score, setScore] = React.useState(0);

    const promocode = 'DCCC2022';

    const handleClose = () => {
        setResult(false);
        setOpen(false);
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
        if (result) {
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
        >
            <div className="gameWrapper">
                <Game
                    handleClose={handleClose}
                    game={<MemoryGame setResult={setResult} setScore={setScore} />}
                />
            </div>
            <Dialog
                open={result}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                className={styles.popup}
            >
                {result ? (
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
                    {result ? (
                        <DialogTitle>Поздравляем!</DialogTitle>
                    ) : (
                        <DialogTitle>
                            К сожалению, вы не успели найти все пары картинок вовремя
                        </DialogTitle>
                    )}
                    <DialogContent>
                        {result ? (
                            <>
                                <DialogContentText id="alert-dialog-slide-description">
                                    У вас прекрасная память и быстрая реакция! За это дарим вам
                                    подарок!
                                </DialogContentText>
                                {/* <div
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
                                </div> */}
                                <PromoCode
                                    promoCode={promocode}
                                    promoCodeText="Срок действия промокода 31.01.2022"
                                />
                            </>
                        ) : (
                            <></>
                        )}
                    </DialogContent>
                    <DialogActions>
                        {result ? (
                            <>
                                <Button onClick={handleClose}>Заказать сейчас</Button>
                                <Button onClick={handleClose}>В календарь</Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={handleClose}>Играть ещё раз</Button>
                                <Button onClick={handleClose}>В календарь</Button>
                            </>
                        )}
                    </DialogActions>
                </div>
            </Dialog>
        </Dialog>
    );
};

export default Day4;
