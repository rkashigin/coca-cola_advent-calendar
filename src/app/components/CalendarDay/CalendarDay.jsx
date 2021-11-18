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

import styles from './CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CalendarDay = ({
    id,
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
    buttonText
}) => {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const app = document.querySelector('.App');
        app.style.filter = open ? 'blur(10px)' : '';
    }, [open]);

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
                        <div
                            name="promoCode"
                            type="button"
                            value={promoCode}
                            className={styles.modal__promoCode}
                            // onChange={changeHandler}
                        >
                            {promoCode}
                            <button type="button">{/* icon */}</button>
                        </div>
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

CalendarDay.defaultProps = {
    className: '',
    classNameImg: '',
    classNameSpan: ''
};

CalendarDay.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    img: PropTypes.string.isRequired,
    className: PropTypes.elementType,
    classNameImg: PropTypes.elementType,
    classNameSpan: PropTypes.elementType
};

export default CalendarDay;
