import React, { useState, useEffect, useRef, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import Countdown from 'react-countdown';
import ReactCodeInput from 'react-code-input';
import Recaptcha from 'react-google-invisible-recaptcha';

import { IMask } from 'react-imask';
import { RootStore } from '../../stores/RootStore';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

import styles from './OtpAuth.module.scss';
import config from '../../../config';

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
                    : 'Войдите или зарегистрируйтесь, чтобы продолжить'
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
    const recaptchaRef = useRef(null);

    return (
        <div>
            <input
                className={styles.otpAuth__input}
                type="text"
                value={masked.resolve(String(tel))}
                onChange={(ev) => setTel(ev.target.value)}
                placeholder={masked.mask}
            />
            {!!RootStore.oauthCodeErr && (
                <p className={styles.otpAuth__infoError}>Не удалось отправить код</p>
            )}
            <Button
                className={styles.otpAuth__button}
                content="Получить код"
                onClick={() => {
                    recaptchaRef.current.execute().then((rtoken) => {
                        RootStore.userOtp(tel, rtoken);
                    });
                }}
            />
            <Recaptcha ref={recaptchaRef} sitekey={config.recaptchaSiteKey} />
        </div>
    );
});

const ValidateCode = () => {
    const [code, setCode] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const date = useMemo(() => {
        if (RootStore.otp.expiresIn) {
            return Date.now() + RootStore.otp.expiresIn * 1_000;
        }
        return 0;
    }, []);

    useEffect(() => {
        if (code.length === 6) {
            RootStore.loginOtp(code);
        }
    }, [code]);

    const recaptchaRef = useRef(null);

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
                    onClick={() =>
                        recaptchaRef.current.execute().then((rtoken) => {
                            RootStore.userOtp(RootStore.otpTel, rtoken);
                        })
                    }
                />
            ) : (
                <div className={styles.otpAuth__textGetCode}>
                    Получить новый код можно через{' '}
                    <Countdown date={date} onComplete={() => setIsComplete(true)} />
                </div>
            )}
            <Recaptcha ref={recaptchaRef} sitekey={config.recaptchaSiteKey} />
            {/* <Button
                className={styles.otpAuth__button}
                content="Подтвердить"
                onClick={() => RootStore.loginOtp(code)}
            /> */}
        </div>
    );
};

OtpAuth.GetCode = GetCode;
OtpAuth.ValidateCode = ValidateCode;

export default OtpAuth;
