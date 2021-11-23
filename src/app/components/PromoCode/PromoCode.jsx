/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import classNames from 'classnames';

import { Alert, AlertTitle } from '@mui/material';

import { ReactComponent as CopyIcon } from '../../assets/icons/Modal_promoCode_button_copy.svg';

import styles from './PromoCode.module.scss';

const PromoCode = ({ promoCode, promoCodeText }) => {
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

    return (
        <div className={styles.promoCode}>
            <div className={styles.promoCode__text}>{promoCodeText}</div>
            <div
                name="promoCode"
                type="button"
                value={promoCode}
                className={styles.promoCode__input}
                // onChange={changeHandler}
            >
                {promoCode}
                <button className={styles.promoCode__button} type="button" onClick={copiedHandler}>
                    <CopyIcon className={styles.promoCode__button_copy} />
                </button>
                <Alert
                    severity="success"
                    className={classNames(styles.promoCode__alert_success, {
                        [styles.promoCode_copied]: copied
                    })}
                >
                    <AlertTitle className={styles.promoCode__alertInfo}>Скопировано</AlertTitle>
                </Alert>
            </div>
        </div>
    );
};

export default PromoCode;
