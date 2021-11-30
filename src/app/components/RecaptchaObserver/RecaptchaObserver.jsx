import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Recaptcha from 'react-google-invisible-recaptcha';
import { RootStore } from '../../stores/RootStore';
import config from '../../../config';

const RecaptchaObserver = observer(() => {
    return <>{RootStore.recaptchaTokenIsNull && <RecaptchaObserver.RecaptchaObserverInner />}</>;
});

const RecaptchaObserverInner = () => {
    const recaptchaRef = useRef(null);
    const recaptchaOnLoaded = () => {
        if (recaptchaRef.current) {
            recaptchaRef.current.execute().then((rtoken) => {
                console.log('recaptcha execute');
                RootStore.setRecaptchaToken(rtoken);
            });
        }
    };
    return (
        <Recaptcha
            ref={recaptchaRef}
            sitekey={config.recaptchaSiteKey}
            onLoaded={recaptchaOnLoaded}
        />
    );
};

RecaptchaObserver.RecaptchaObserverInner = RecaptchaObserverInner;

export default RecaptchaObserver;
