/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Alert, AlertTitle } from '@mui/material';

import { ReactComponent as CopyIcon } from '../../assets/icons/Modal_promoCode_button_copy.svg';

import styles from './CalendarDay.module.scss';

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
    const [open, setOpen] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    const copiedHandler = async () => {
        try {
            await navigator.clipboard.writeText(promoCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (e) {
            console.log(e);
        }
    };

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
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className={classNames(className, styles.calendarDay)} onClick={handleClickOpen}>
                <span className={classNames(classNameSpan, styles.calendarDay__date)}>{date}</span>
                <img
                    className={classNames(classNameImg, styles.calendarDay__img)}
                    src={img}
                    alt=""
                />
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                className={styles.popup}
                // transitionDuration={...(openedDay && { exit: 0 })}
            >
                <img
                    className={classNames(classNameImg, styles.calendarModal__img)}
                    src={modalImg}
                    alt=""
                />
                <div className={styles.modal}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {intro}
                        </DialogContentText>
                        <div>
                            <img
                                className={classNames(classNameImg, styles.calendarModal__img)}
                                src={promoCodeImg}
                                alt=""
                            />
                            {promoCodeText}
                        </div>
                        {promoCode && (
                            <div
                                name="promoCode"
                                type="button"
                                value={promoCode}
                                className={styles.modal__promoCode}
                                // onChange={changeHandler}
                            >
                                {promoCode}
                                <button
                                    className={styles.promoCode__button}
                                    type="button"
                                    onClick={copiedHandler}
                                >
                                    <CopyIcon className={styles.promoCode__button_copy} />
                                </button>
                                <Alert
                                    severity="success"
                                    className={classNames(styles.promoCode__alert_success, {
                                        [styles.promoCode_copied]: copied
                                    })}
                                >
                                    <AlertTitle className={styles.promoCode__alertInfo}>
                                        Скопировано
                                    </AlertTitle>
                                </Alert>
                            </div>
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
