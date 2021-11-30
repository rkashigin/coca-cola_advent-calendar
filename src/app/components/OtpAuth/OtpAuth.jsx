import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Countdown from 'react-countdown';
import ReactCodeInput from 'react-code-input';

import { IMask } from 'react-imask';
import { RootStore } from '../../stores/RootStore';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

import styles from './OtpAuth.module.scss';

const OtpAuth = observer(() => {
    useEffect(() => {
        const app = document.querySelector('.App');
        app.style.filter = RootStore.oauthOpen ? 'blur(10px)' : '';
    }, [RootStore.oauthOpen]);

    useEffect(() => {
        return () => {
            RootStore.clearOtp();
        };
    }, []);

    return (
        <Modal
            className={styles.otpAuth}
            title={
                RootStore.otp.requestId
                    ? 'Введите код'
                    : 'Войдите или зарегитрируйтесь, чтобы продолжить'
            }
            open={RootStore.oauthOpen && !RootStore.user.id}
            handleClose={() => RootStore.setOauthOpen(false)}
            hasDialogActions={false}
        >
            <div>{RootStore.otp.requestId ? <OtpAuth.ValidateCode /> : <OtpAuth.GetCode />}</div>
        </Modal>
    );
});

const GetCode = observer(() => {
    const [tel, setTel] = useState('');
    const masked = IMask.createMask({
        mask: '+7 (000) 000-00-00'
    });
    return (
        <div>
            <input
                className={styles.otpAuth__input}
                type="text"
                value={masked.resolve(String(tel))}
                onChange={(ev) => setTel(ev.target.value)}
                placeholder={masked.mask}
            />
            {!!RootStore.oauthCodeErr && <p>Не удалось отправить код</p>}
            <Button
                className={styles.otpAuth__button}
                content="Получить код"
                onClick={() => RootStore.userOtp(tel)}
            />
        </div>
    );
});

const ValidateCode = () => {
    const [code, setCode] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    return (
        <div>
            <div className={styles.otpAuth__textInfo}>Мы отправили код на номер</div>
            <div className={styles.otpAuth__textInfo}>{RootStore.otpTel}</div>
            <ReactCodeInput
                name="code"
                className={styles.otpAuth__codeInput}
                type="number"
                fields={6}
                placeholder="0"
                inputMode="numeric"
                value={code}
                onChange={setCode}
            />
            {isComplete ? (
                <Button
                    className={styles.otpAuth__button}
                    content="Отправить еще раз"
                    onClick={() => RootStore.userOtp(RootStore.otpTel)}
                />
            ) : (
                <div className={styles.otpAuth__textGetCode}>
                    Получить новый код можно через{' '}
                    <Countdown
                        date={Date.now() + RootStore.otp.expiresIn * 1_000}
                        onComplete={() => setIsComplete(true)}
                    />
                </div>
            )}
            <Button
                className={styles.otpAuth__button}
                content="Подтвердить"
                onClick={() => RootStore.loginOtp(code)}
            />
        </div>
    );
};

OtpAuth.GetCode = GetCode;
OtpAuth.ValidateCode = ValidateCode;

export default OtpAuth;
