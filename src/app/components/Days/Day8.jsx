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
import { Survey } from '../../games';
import config from '../../config';

import styles from '../CalendarDay/CalendarDay.module.scss';
import { useDay } from '../../hooks';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day8 = ({ setOpenedDay }) => {
    const { open, result, resultVisible, setResult, handleClose } = useDay({
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
                            <Survey
                                survey={config.references.surveys.day8.survey}
                                setResult={setResult}
                                day={8}
                            />
                        }
                        setResult={setResult}
                        test
                    />
                </div>
            </Dialog>
            <Dialog open={resultVisible} TransitionComponent={Transition} className={styles.popup}>
                <img
                    className={styles.modalResult__img}
                    src={require('../../assets/images/Games/game_win.svg').default}
                    alt=""
                />
                <div className={styles.modal}>
                    {result.status === 'A' && (
                        <DialogTitle>
                            Вы мечтательны и несете в себе эту черту на протяжении всей жизни
                        </DialogTitle>
                    )}
                    {result.status === 'B' && (
                        <DialogTitle>
                            Вам присущи особенное восприятие мира и тонкий вкус
                        </DialogTitle>
                    )}
                    {result.status === 'C' && (
                        <DialogTitle>
                            Возможно, серые будни и рутина захватили вас с головой
                        </DialogTitle>
                    )}
                    {result.status === 'D' && (
                        <DialogTitle>
                            Для вас очень важны праздники, о чем Дедушка Мороз знает
                        </DialogTitle>
                    )}
                    <DialogContent>
                        {result.status === 'A' && (
                            <DialogContentText id="alert-dialog-slide-description">
                                Это прекрасное качество, которое Дедушка Мороз до глубины души любит
                                и ценит. Вы попадете в список, где эльфы, феи и магические существа,
                                а подарки удивят своим волшебством
                            </DialogContentText>
                        )}
                        {result.status === 'B' && (
                            <DialogContentText id="alert-dialog-slide-description">
                                Поэтому Дедушка Мороз внес вас в список ценителей красоты и
                                изящества, где и сюрпризы соответствующие
                            </DialogContentText>
                        )}
                        {result.status === 'C' && (
                            <DialogContentText id="alert-dialog-slide-description">
                                Дедушка Мороз расстраивается, когда это происходит. Но для таких
                                людей у него подготовлен особенный список, где подарки наполнены
                                волшебством праздника. Это тайная древняя магия, которая возвращает
                                в людей веру в новогодние чудеса
                            </DialogContentText>
                        )}
                        {result.status === 'D' && (
                            <DialogContentText id="alert-dialog-slide-description">
                                Он внесет вас в самый скорый список, чтобы подарки и новогоднее
                                настроение не заставили себя ждать. Вы весь год старались, поэтому
                                заслужили немного отдыха и волшебства
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

export default Day8;
