/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import Game from '../Game';
import { WhereIsGame } from '../../games';
import { useDay } from '../../hooks';
import PromoCode from '../PromoCode/PromoCode';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day9 = ({ setOpenedDay }) => {
    const { open, result, resultVisible, setResult, handleClose, handleRestart } = useDay({
        setOpenedDay
    });

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
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
            </Dialog>
            <Dialog open={resultVisible} TransitionComponent={Transition} className={styles.popup}>
                {result.status ? (
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

export default Day9;
