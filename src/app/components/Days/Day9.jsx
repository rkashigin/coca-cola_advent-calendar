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

import styles from '../CalendarDay/CalendarDay.module.scss';
import Game from '../Game';
import { WhereIsGame } from '../../games';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day9 = ({ setOpenedDay }) => {
    const [open, setOpen] = React.useState(true);
    const [result, setResult] = React.useState({});
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
            fullScreen
            fullWidth
        >
            <div className="gameWrapper">
                <Game
                    handleClose={handleClose}
                    game={<WhereIsGame gameVariant="easy" setResult={setResult} />}
                    setResult={setResult}
                    fullScreen
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
                        <>
                            {result.promoCode ? (
                                <>
                                    <DialogTitle>Ура! Вы нашли наш холодильник!</DialogTitle>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        За это дарим вам подарок!
                                    </DialogContentText>
                                    <PromoCode
                                        type="red"
                                        promoCode={result.promoCode}
                                        promoCodeText="Срок действия промокода 31.01.2022"
                                    />
                                </>
                            ) : (
                                <>
                                    <DialogTitle>Ура!</DialogTitle>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        Вы нашли наш холодильник!
                                    </DialogContentText>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <DialogTitle>Как жаль, холодильник так и на нашелся</DialogTitle>
                            <DialogContentText id="alert-dialog-slide-description">
                                Кто-то спрятал его в очень надежном месте
                            </DialogContentText>
                        </>
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

export default Day9;
