/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import classNames from 'classnames';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Button from '../Button/Button';

import SocialNetwork from '../SocialNetwork/SocialNetwork';

import styles from '../CalendarDay/CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Day11 = () => {
    const [open, setOpen] = React.useState(true);
    const [result, setResult] = React.useState(true);

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
                <div className={styles.modalResult__postcard} />

                <DialogContent>
                    <h3 className={styles.modalResult__postcardTitle}>Поделиться с друзьями</h3>
                    <SocialNetwork />
                </DialogContent>
                <DialogActions>
                    <Button
                        className={styles.modalResult__button}
                        onClick={handleClose}
                        content="В календарь"
                    />
                </DialogActions>
            </div>
        </Dialog>
    );
};

export default Day11;
