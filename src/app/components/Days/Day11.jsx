/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import classNames from 'classnames';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { ReactComponent as CopyIcon } from '../../assets/icons/Modal_promoCode_button_copy.svg';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const Day11 = () => {
    const [open, setOpen] = React.useState(true);
    const [result, setResult] = React.useState(true);

    const promocode = 'DCCC2022';

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
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            className={styles.popup}
        >
            <div className={classNames(styles.modal, styles.modal__postcard)}>
                <img
                    className={styles.modalResult__postcard}
                    src={require('../../assets/images/Games/game_postcard.png').default}
                    alt=""
                />

                <DialogContent>
                    <ul>
                        <li>
                            <a href="/">Fb</a>
                        </li>
                        <li>
                            <a href="/">Twit</a>
                        </li>
                        <li>
                            <a href="/">Vk</a>
                        </li>
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>В календарь</Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};
