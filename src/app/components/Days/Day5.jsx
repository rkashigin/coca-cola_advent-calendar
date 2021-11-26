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
import { Quiz, TruthOrMyth } from '../../games';
import config from '../../config';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day5 = ({ setOpenedDay }) => {
    const [open, setOpen] = React.useState(true);
    const [result, setResult] = React.useState({});
    const [score, setScore] = React.useState(0);
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
        >
            <div className="gameWrapper">
                <Game
                    handleClose={handleClose}
                    game={
                        <TruthOrMyth
                            quiz={config.references.truthOrMyths.day5.quiz}
                            setResult={setResult}
                            setScore={setScore}
                        />
                    }
                    setResult={setResult}
                    test
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
                <img
                    className={styles.modalResult__img_result}
                    src={require('../../assets/images/Games/game_1_day.png').default}
                    alt=""
                />

                <div className={styles.modal}>
                    {result.status ? (
                        <DialogTitle>Вы настоящий знаток Coca-Cola!</DialogTitle>
                    ) : (
                        <DialogTitle>
                            О Coca-Cola вы знаете еще совсем мало, но мы поможем подтянуть знания!
                        </DialogTitle>
                    )}
                    <DialogContent>
                        {result.status ? (
                            <DialogContentText id="alert-dialog-slide-description">
                                Чтобы продвинуться дальше по календарю, закажите Coca-Cola в
                                ресторанах Delivery Club за 1 ₽ по нашему специальному промокоду
                            </DialogContentText>
                        ) : (
                            <DialogContentText id="alert-dialog-slide-description">
                                Чтобы продвинуться дальше по календарю, закажите Coca-Cola в
                                ресторанах Delivery Club за 1 ₽ по нашему специальному промокоду
                            </DialogContentText>
                        )}
                        <PromoCode
                            type="red"
                            promoCode={result.promoCode}
                            promoCodeText="Срок действия промокода 31.01.2022"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Заказать сейчас</Button>
                        <Button onClick={handleClose}>В календарь</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </Dialog>
    );
};

export default Day5;
