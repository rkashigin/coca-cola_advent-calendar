/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { CircularProgress, Link } from '@mui/material';

import { observer } from 'mobx-react-lite';
import Button from '../Button/Button';
import Adaptive from '../../helpers/Adaptive';

import PromoCode from '../PromoCode/PromoCode';

import styles from './CalendarDay.module.scss';
import { RootStore } from '../../stores/RootStore';
import sendEvent, { GA_MAP } from '../../helpers/analytics';
import isDayActive from '../../helpers/isDayActive';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CalendarDay = observer(
    ({
        date,
        img,
        className,
        classNameImg,
        classNameSpan,
        modalImg,
        title,
        intro,
        promoCode,
        type,
        openedDay,
        handleOpenDay,
        orderLink
    }) => {
        const isDesktop = useMediaQuery(Adaptive.isDesktop);
        const isHorizontal = useMediaQuery(Adaptive.isHorizontal);
        const [open, setOpen] = React.useState(false);
        const [loadedPromocode, setLoadedPromocode] = React.useState({ 1: '', 12: '' });

        const handleClickOpen = () => {
            if (RootStore.user.id) {
                if (isDayActive(date)) {
                    setOpen(true);
                }
            } else {
                RootStore.setOauthOpen(true);
            }
        };
        const handleClose = () => {
            setOpen(false);
        };

        const findPromocodes = () => {
            if (date === 1) {
                const firstCode =
                    RootStore.myPromocodes.find(({ Type }) => Type === 0)?.Value || '';

                setLoadedPromocode({ ...loadedPromocode, 1: firstCode });
            }

            if (date === 12) {
                const lastCode = RootStore.myPromocodes.find(({ Type }) => Type === 6)?.Value || '';

                setLoadedPromocode({ ...loadedPromocode, 12: lastCode });
            }
        };

        const handleRequestPromoCode = async () => {
            try {
                const data = await RootStore.dayComplete(date);

                setLoadedPromocode({ ...loadedPromocode, [date]: data.promocode });
            } catch {
                findPromocodes();
            }
        };

        useEffect(() => {
            if (RootStore.myPromocodes.length) {
                findPromocodes();
            }
        }, [RootStore.myPromocodes]);

        useEffect(() => {
            const app = document.querySelector('.App');
            app.style.filter = open ? 'blur(10px)' : '';

            if (
                open &&
                (date === 1 || date === 12) &&
                RootStore.user.id &&
                (RootStore.myGamesCompleted < 2 || RootStore.myGamesCompleted > 11)
            ) {
                handleRequestPromoCode();
            }
        }, [date, open, RootStore.user.id, RootStore.myGamesCompleted]);

        useEffect(() => {
            if (openedDay) {
                setOpen(false);
            }
        }, [openedDay]);

        return (
            <>
                <div
                    className={classNames(className, styles.calendarDay)}
                    onClick={handleClickOpen}
                >
                    <span className={classNames(classNameSpan, styles.calendarDay__date)}>
                        {date}
                    </span>
                    <img className={styles.calendarDay__img} src={img} alt="" />
                </div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    onClose={(_, reason) => {
                        if (reason === 'backdropClick') return;

                        handleClose();
                    }}
                    className={styles.popup}
                    onBackdropClick={() => {}}
                >
                    <div className={styles.modal}>
                        <img
                            className={classNames(
                                classNameImg,
                                isHorizontal
                                    ? styles.calendarModal__img_horizontalMedia
                                    : styles.calendarModal__img
                            )}
                            src={modalImg}
                            alt=""
                        />
                        <DialogTitle>{title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                {intro}
                            </DialogContentText>
                            {date === 1 || date === 12 ? (
                                <>
                                    {loadedPromocode[date] ? (
                                        <PromoCode
                                            type="red"
                                            promoCode={loadedPromocode[date]}
                                            promoCodeText="Срок действия промокода 31.01.2022"
                                        />
                                    ) : (
                                        <CircularProgress />
                                    )}
                                </>
                            ) : (
                                promoCode && (
                                    <PromoCode
                                        type="red"
                                        promoCode={promoCode}
                                        promoCodeText="Срок действия промокода 31.01.2022"
                                    />
                                )
                            )}
                        </DialogContent>
                        {type === 'test' && (
                            <DialogActions>
                                <Button
                                    className={styles.calendarDay__button_green}
                                    onClick={handleOpenDay}
                                >
                                    Начать тест
                                </Button>
                                <Button
                                    className={styles.calendarDay__button}
                                    onClick={() => {
                                        handleClose();
                                        sendEvent(GA_MAP.buttonClick(`start game ${date}`));
                                    }}
                                >
                                    Выполнить позже
                                </Button>
                            </DialogActions>
                        )}
                        {type === 'game' && (
                            <DialogActions>
                                <Button
                                    className={styles.calendarDay__button_green}
                                    onClick={handleOpenDay}
                                >
                                    Начать игру
                                </Button>
                                <Button
                                    className={styles.calendarDay__button}
                                    onClick={() => {
                                        handleClose();
                                        sendEvent(GA_MAP.buttonClick(`start game ${date}`));
                                    }}
                                >
                                    Выполнить позже
                                </Button>
                            </DialogActions>
                        )}
                        {type === 'promoCode' &&
                            !((date === 1 || date === 12) && !loadedPromocode[date]) && (
                                <DialogActions>
                                    {isDesktop && (
                                        <a
                                            href={orderLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.calendarModal__button}
                                        >
                                            Заказать сейчас
                                        </a>
                                    )}
                                    <Button
                                        className={styles.calendarDay__button}
                                        onClick={handleClose}
                                    >
                                        В календарь
                                    </Button>
                                </DialogActions>
                            )}
                        {type === 'postCard' && (
                            <DialogActions>
                                <Button
                                    className={styles.calendarDay__button_green}
                                    onClick={handleOpenDay}
                                >
                                    Сделать открытку
                                </Button>
                                <Button
                                    className={styles.calendarDay__button}
                                    onClick={handleClose}
                                >
                                    Выполнить позже
                                </Button>
                            </DialogActions>
                        )}
                    </div>
                </Dialog>
            </>
        );
    }
);

CalendarDay.propTypes = {
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    orderLink: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    className: PropTypes.elementType,
    classNameImg: PropTypes.elementType,
    classNameSpan: PropTypes.elementType
};

CalendarDay.defaultProps = {
    className: '',
    classNameImg: '',
    classNameSpan: ''
};

export default CalendarDay;
