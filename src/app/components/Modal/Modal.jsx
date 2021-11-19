/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { DialogContentText } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '../Button/Button';

import styles from './Modal.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({ open, handleClose, title, children }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            className={styles.popup}
        >
            <div className={styles.modal}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" />
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Заказать сейчас</Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};

export default Modal;
