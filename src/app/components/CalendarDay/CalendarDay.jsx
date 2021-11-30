/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Alert, AlertTitle } from '@mui/material';
import reactDom from 'react-dom';
import Adaptive from '../../helpers/Adaptive';

import PromoCode from '../PromoCode/PromoCode';

import { ReactComponent as CopyIcon } from '../../assets/icons/Modal_promoCode_button_copy.svg';

import styles from './CalendarDay.module.scss';
import { RootStore } from '../../stores/RootStore';
import { RootStoreApi } from '../../stores/RootStore.api';
// import OtpAuth from '../OtpAuth/OtpAuth';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CalendarDay = ({
    date,
    img,
    className,
    classNameImg,
    classNameSpan,
    modalImg,
    title,
    intro,
    promoCodeImg,
    promoCodeText,
    promoCode,
    type,
    openedDay,
    handleOpenDay
}) => {
    const isHorizontal = useMediaQuery(Adaptive.isHorizontal);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const app = document.querySelector('.App');
        app.style.filter = open ? 'blur(10px)' : '';
    }, [open]);

    useEffect(() => {
        if (openedDay) {
            setOpen(false);
        }
    }, [openedDay]);

    const handleClickOpen = () => {
        console.log(RootStore.user.id);
        if (RootStore.user.id) {
            setOpen(true);
        } else {
            RootStore.setOauthOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            // RootStore.dayComplete(date);
        }
    }, [date, open]);

    return (
        <>
            <div className={classNames(className, styles.calendarDay)} onClick={handleClickOpen}>
                <span className={classNames(classNameSpan, styles.calendarDay__date)}>{date}</span>
                <img className={styles.calendarDay__img} src={img} alt="" />
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
                className={styles.popup}
                // transitionDuration={...(openedDay && { exit: 0 })}
            >
                {/* {!isHorizontal && ( */}
                {/* <img
                    className={classNames(classNameImg, styles.calendarModal__img)}
                    src={modalImg}
                    alt=""
                /> */}
                {/* )} */}
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
                        {promoCode && (
                            <PromoCode
                                type="red"
                                promoCode={promoCode}
                                promoCodeText="Срок действия промокода 31.01.2022"
                            />
                        )}
                    </DialogContent>
                    {type === 'test' && (
                        <DialogActions>
                            <Button onClick={handleOpenDay}>Начать тест</Button>
                            <Button onClick={handleClose}>Выполнить позже</Button>
                        </DialogActions>
                    )}
                    {type === 'game' && (
                        <DialogActions>
                            <Button onClick={handleOpenDay}>Начать игру</Button>
                            <Button onClick={handleClose}>Выполнить позже</Button>
                        </DialogActions>
                    )}
                    {type === 'promoCode' && (
                        <DialogActions>
                            <Button onClick={handleOpenDay}>Заказать сейчас</Button>
                            <Button onClick={handleClose}>В календарь</Button>
                        </DialogActions>
                    )}
                    {type === 'postCard' && (
                        <DialogActions>
                            <Button onClick={handleOpenDay}>Узнать</Button>
                            <Button onClick={handleClose}>Выполнить позже</Button>
                        </DialogActions>
                    )}
                </div>
            </Dialog>
        </>
    );
};

CalendarDay.defaultProps = {
    className: '',
    classNameImg: '',
    classNameSpan: ''
};

CalendarDay.propTypes = {
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    img: PropTypes.string.isRequired,
    className: PropTypes.elementType,
    classNameImg: PropTypes.elementType,
    classNameSpan: PropTypes.elementType
};

export default CalendarDay;
