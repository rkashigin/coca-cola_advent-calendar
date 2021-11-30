import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Countdown from 'react-countdown';

import { RootStore } from '../../stores/RootStore';
import Modal from '../Modal/Modal';

const OtpAuth = observer(() => {
    useEffect(() => {
        return () => {
            RootStore.clearOtp();
        };
    }, []);

    return (
        <Modal
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
    return (
        <div>
            <input type="text" value={tel} onChange={(ev) => setTel(ev.target.value)} />
            {!!RootStore.oauthCodeErr && <p>Не удалось отправить код</p>}
            <button type="button" onClick={() => RootStore.userOtp(tel)}>
                Получить код
            </button>
        </div>
    );
});

const ValidateCode = () => {
    const [code, setCode] = useState('');
    const [isComplite, setIsComplite] = useState(false);
    return (
        <div>
            <div>
                Мы отправили код на номер
                {RootStore.otpTel}
            </div>
            <input type="text" value={code} onChange={(ev) => setCode(ev.target.value)} />
            {isComplite ? (
                <button type="button" onClick={() => RootStore.userOtp(RootStore.otpTel)}>
                    Отправить еще раз
                </button>
            ) : (
                <div>
                    Получить новый код можно через
                    <Countdown
                        date={Date.now() + RootStore.otp.expiresIn * 1_000}
                        onComplete={() => setIsComplite(true)}
                    />
                </div>
            )}
            <button type="button" onClick={() => RootStore.loginOtp(code)}>
                Подтвердить
            </button>
        </div>
    );
};

OtpAuth.GetCode = GetCode;
OtpAuth.ValidateCode = ValidateCode;

export default OtpAuth;
