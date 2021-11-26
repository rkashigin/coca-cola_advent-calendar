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
import { Quiz } from '../../games';
import config from '../../config';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day3 = ({ setOpenedDay }) => {
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
                        <Quiz
                            quiz={config.references.quizes.day3.quiz}
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
                    {/* <DialogTitle>
                        {score} из {config.references.quizes.day3.quiz.length}
                    </DialogTitle> */}
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
                                    <Button onClick={handleClose}>Пройти тест еще раз</Button>
                                )}
                                <Button onClick={handleClose}>В календарь</Button>
                            </>
                        )}
                    </DialogActions>
                </div>
            </Dialog>
        </Dialog>
    );
};

export default Day3;
