/* eslint-disable react/prop-types */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useMediaQuery } from 'react-responsive';

import Adaptive from '../../helpers/Adaptive';
import Button from '../Button/Button';
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
    const isMobile = useMediaQuery(Adaptive.isMobile);
    const { open, result, resultVisible, setResult, handleClose } = useDay({
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
                <div className={styles.modal}>
                    <img
                        className={styles.modalResult__img}
                        src={require('../../assets/images/Games/game_win.svg').default}
                        alt=""
                    />
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
                        {!isMobile && (
                            <a
                                href={
                                    !isMobile
                                        ? config.references.orderLinks[8].orderLinkDesktop
                                        : config.references.orderLinks[8].orderLinkMobile
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.calendarModal__button}
                            >
                                Заказать сейчас
                            </a>
                        )}
                        <Button className={styles.calendarDay__button} onClick={handleClose}>
                            В календарь
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    );
};

export default Day8;
