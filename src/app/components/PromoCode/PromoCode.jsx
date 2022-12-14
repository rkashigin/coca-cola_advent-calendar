/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';

import { Alert, AlertTitle } from '@mui/material';

import { ReactComponent as CopyIcon } from '../../assets/icons/Modal_promoCode_button_copy.svg';

import styles from './PromoCode.module.scss';
import sendEvent, { GA_MAP } from '../../helpers/analytics';

const PromoCode = ({ promoCode, promoCodeText, type, promoCodeName }) => {
    const [copied, setCopied] = React.useState(false);

    const copiedHandler = async () => {
        sendEvent(GA_MAP.buttonClick('promoCode copy'));
        try {
            await navigator.clipboard.writeText(promoCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e);
        }
    };

    return (
        <div className={styles.promoCode}>
            {promoCodeName && (
                <div className={classNames(styles.promoCode__text_red, styles.promoCode__name)}>
                    {promoCodeName}
                </div>
            )}
            {type === 'grey' && <div className={styles.promoCode__text_grey}>{promoCodeText}</div>}
            <div
                className={classNames(styles.promoCode__input, {
                    [styles.promoCode__input_grey]: type === 'grey'
                })}
                // onChange={changeHandler}
            >
                <span>{promoCode}</span>
                <button className={styles.promoCode__button} type="button" onClick={copiedHandler}>
                    <CopyIcon
                        className={classNames(styles.promoCode__button_copy, {
                            [styles.promoCode__buttonIcon_grey]: type === 'grey'
                        })}
                    />
                </button>
                <Alert
                    severity="success"
                    className={classNames(styles.promoCode__alert_success, {
                        [styles.promoCode_copied]: copied
                    })}
                >
                    <AlertTitle className={styles.promoCode__alertInfo}>??????????????????????</AlertTitle>
                </Alert>
            </div>
            {type === 'red' && <div className={styles.promoCode__text_red}>{promoCodeText}</div>}
        </div>
    );
};

export default PromoCode;
