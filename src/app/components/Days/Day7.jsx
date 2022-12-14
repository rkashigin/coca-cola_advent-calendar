/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useMediaQuery } from 'react-responsive';

import config from '../../config';
import Adaptive from '../../helpers/Adaptive';
import Button from '../Button/Button';
import Game from '../Game';
import { ThreeInARowGame } from '../../games';
import { useDay } from '../../hooks';
import PromoCode from '../PromoCode/PromoCode';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day7 = ({ setOpenedDay }) => {
    const isMobile = useMediaQuery(Adaptive.isMobile);
    const { open, result, resultVisible, setScore, setResult, handleClose, handleRestart } = useDay(
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
                        game={<ThreeInARowGame setResult={setResult} setScore={setScore} day={7} />}
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
                        <>
                            {result.promoCode ? (
                                <>
                                    <DialogTitle>?????? ?????? ????????????????!</DialogTitle>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        ???? ???????????? ???? ?????????? ???????????????? ?????? ?????? ??????????????!
                                    </DialogContentText>
                                    <PromoCode
                                        type="red"
                                        promoCode={result.promoCode}
                                        promoCodeText="???????? ???????????????? ?????????????????? 31.01.2022"
                                    />
                                </>
                            ) : (
                                <>
                                    <DialogTitle>??????????????????????!</DialogTitle>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        ???? ?????????????????? ???????????????????? ?? ????????????????! ???????? ???????????????? ????????
                                        ???????????? ????????????!
                                    </DialogContentText>
                                </>
                            )}
                        </>
                    ) : (
                        <DialogTitle>
                            ?????? ????????, ?????????? ??????????! ???? ???? ??????????, ?????? ???? ?????????? ??????????????????!
                        </DialogTitle>
                    )}
                    <DialogActions>
                        {result.status ? (
                            <>
                                {result.promoCode ? (
                                    <>
                                        {!isMobile && (
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
                                    <Button
                                        className={styles.calendarDay__button_green}
                                        onClick={handleClose}
                                    >
                                        ???????????????? ????????????!
                                    </Button>
                                )}
                            </>
                        ) : (
                            <>
                                <Button
                                    className={styles.calendarDay__button_green}
                                    onClick={handleRestart}
                                >
                                    ???????????? ?????? ??????
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

export default Day7;
