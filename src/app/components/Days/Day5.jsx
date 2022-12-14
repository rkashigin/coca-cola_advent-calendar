/* eslint-disable react/prop-types */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { observer } from 'mobx-react-lite';
import { useMediaQuery } from 'react-responsive';

import Adaptive from '../../helpers/Adaptive';
import Button from '../Button/Button';
import Game from '../Game';
import { TruthOrMyth } from '../../games';
import config from '../../config';
import { useDay } from '../../hooks';
import PromoCode from '../PromoCode/PromoCode';
import { RootStore } from '../../stores/RootStore';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day5 = observer(({ setOpenedDay }) => {
    const isMobile = useMediaQuery(Adaptive.isMobile);
    const { open, result, resultVisible, setScore, setResult, handleClose } = useDay({
        setOpenedDay
    });
    const recievedPromocode = RootStore.myPromocodes.find(({ Type }) => Type === 4)?.Value || '';

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
            <Dialog open={resultVisible} TransitionComponent={Transition} className={styles.popup}>
                <div className={styles.modal}>
                    <img
                        className={styles.modalResult__img}
                        src={require('../../assets/images/Games/game_win.svg').default}
                        alt=""
                    />
                    {result.status ? (
                        <DialogTitle>???? ?????????????????? ???????????? Coca-Cola!</DialogTitle>
                    ) : (
                        <DialogTitle>
                            ?? Coca-Cola ???? ???????????? ?????? ???????????? ????????, ???? ???? ?????????????? ?????????????????? ????????????!
                        </DialogTitle>
                    )}
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            ?????????? ???????????????????????? ???????????? ???? ??????????????????, ???????????????? ?????????? ?? ????????????????????
                            Delivery Club ?? Coca-Cola ?? ???????? ???? ???????????? ???????????????????????? ??????????????????.
                        </DialogContentText>
                        {(recievedPromocode || result.promoCode) && (
                            <PromoCode
                                type="red"
                                promoCode={recievedPromocode || result.promoCode}
                                promoCodeText="???????? ???????????????? ?????????????????? 31.01.2022"
                            />
                        )}
                    </DialogContent>
                    <DialogActions>
                        {!isMobile && (recievedPromocode || result.promoCode) && (
                            <a
                                href={
                                    !isMobile
                                        ? config.references.orderLinks[5].orderLinkDesktop
                                        : config.references.orderLinks[5].orderLinkMobile
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.calendarModal__button}
                            >
                                ???????????????? ????????????
                            </a>
                        )}
                        <Button className={styles.calendarDay__button} onClick={handleClose}>
                            ?? ??????????????????
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    );
});

export default Day5;
