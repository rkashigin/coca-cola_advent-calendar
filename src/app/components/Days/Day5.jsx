/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import Game from '../Game';
import { TruthOrMyth } from '../../games';
import config from '../../config';
import { useDay } from '../../hooks';
import PromoCode from '../PromoCode/PromoCode';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day5 = ({ setOpenedDay }) => {
    const { open, result, resultVisible, setScore, setResult, handleClose } = useDay({
        setOpenedDay
    });

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
                            <TruthOrMyth
                                quiz={config.references.truthOrMyths.day5.quiz}
                                setResult={setResult}
                                setScore={setScore}
                                day={5}
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
        </>
    );
};

export default Day5;
