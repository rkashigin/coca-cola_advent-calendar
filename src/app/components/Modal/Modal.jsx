import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Link } from '@mui/material';

import config from '../../config';
import Button from '../Button/Button';

import { ReactComponent as CloseIcon } from '../../assets/icons/Modal_close_icon.svg';

import styles from './Modal.module.scss';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({ open, handleClose, title, children, hasDialogActions, className }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            onBackdropClick={() => {}}
        >
            <div className={classNames(className, styles.modal)}>
                <Button
                    onClick={handleClose}
                    className={styles.modal__button_close}
                    content="Закрыть"
                >
                    <CloseIcon className={styles.modal__buttonIcon_close} />
                </Button>
                <DialogTitle className={styles.modal__title}>{title}</DialogTitle>
                <DialogContent className={styles.modal__contentWrap}>
                    <div>{children}</div>
                </DialogContent>
                {hasDialogActions && (
                    <DialogActions>
                        <Link
                            component="button"
                            href={config.orderLink}
                            onClick={handleClose}
                            className={styles.modal__button_order}
                        >
                            Заказать сейчас
                        </Link>
                    </DialogActions>
                )}
            </div>
        </Dialog>
    );
};

Modal.defaultProps = {
    title: '',
    children: <></>,
    hasDialogActions: true,
    className: ''
};

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    className: PropTypes.string,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node,
    hasDialogActions: PropTypes.bool
};

export default Modal;
