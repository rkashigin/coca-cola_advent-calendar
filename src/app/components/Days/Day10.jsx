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

import Adaptive from '../../helpers/Adaptive';
import Button from '../Button/Button';
import PromoCode from '../PromoCode/PromoCode';
import Game from '../Game';
import { Riddle } from '../../games';
import config from '../../config';
import { useDay } from '../../hooks';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day10 = ({ setOpenedDay }) => {
    const isMobile = useMediaQuery(Adaptive.isMobile);
    const { open, result, resultVisible, setResult, setScore, handleClose, handleRestart } = useDay(
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
                        game={
                            <Riddle
                                riddle={config.references.riddles.day10.riddle}
                                setResult={setResult}
                                setScore={setScore}
                                day={10}
                            />
                        }
                        setResult={setResult}
                        test
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
                        <DialogTitle>?????? ?????????????? ???? ???????????? ?????? ??????????????! ??????????????????????!</DialogTitle>
                    ) : (
                        <DialogTitle>
                            ?????????????????????? ?????????????? ???????????? ???????????? ?????????????? ?? ????????????
                        </DialogTitle>
                    )}
                    <DialogContent>
                        {result.status ? (
                            <>
                                {result.promoCode ? (
                                    <>
                                        <DialogContentText id="alert-dialog-slide-description">
                                            ?????? ?????????????? ?????? ???????? ??????!
                                        </DialogContentText>
                                        <PromoCode
                                            type="red"
                                            promoCode={result.promoCode}
                                            promoCodeText="???????? ???????????????? ?????????????????? 31.01.2022"
                                        />
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        ) : (
                            <DialogContentText id="alert-dialog-slide-description">
                                ?????? ???? ???????? ???? ??????????. ???? ???? ??????????????????????????????! ???????? ?????????????? ?? ????????????
                                ???????? ?????????? ??????????????
                            </DialogContentText>
                        )}
                    </DialogContent>
                    <DialogActions>
                        {result.status ? (
                            <>
                                {!isMobile && result.promoCode && (
                                    <a
                                        href={
                                            !isMobile
                                                ? config.references.defaultOrderLinkDesktop
                                                : config.references.defaultOrderLinkMobile
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.calendarModal__button}
                                    >
                                        ???????????????? ????????????
                                    </a>
                                )}
                                <Button
                                    className={styles.calendarDay__button}
                                    onClick={handleClose}
                                >
                                    ?? ??????????????????
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    className={styles.calendarDay__button_green}
                                    onClick={handleRestart}
                                >
                                    ???????????? ???????? ?????? ??????
                                </Button>

                                <Button
                                    className={styles.calendarDay__button}
                                    onClick={handleClose}
                                >
                                    ?? ??????????????????
                                </Button>
                            </>
                        )}
                    </DialogActions>
                </div>
            </Dialog>
        </>
    );
};

export default Day10;
