/* eslint-disable react/prop-types */
import React from 'react';

import { ReactComponent as CopyIcon } from '../../assets/icons/Modal_promoCode_button_copy.svg';

import styles from './PromoCode.module.scss';

const PromoCode = ({ promoCode, promoCodeText }) => {
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
                <button className={styles.promoCode__button} type="button">
                    <CopyIcon className={styles.promoCode__button_copy} />
                </button>
            </div>
        </div>
    );
};

export default PromoCode;
