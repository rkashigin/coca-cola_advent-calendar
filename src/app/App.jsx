import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import { Routes } from 'react-router';
import MainPage from './pages/MainPage';

import OtpAuth from './components/OtpAuth/OtpAuth';
import sendEvent, { GA_MAP } from './helpers/analytics';

const App = () => {
    console.log(process.env);
    useEffect(() => {
        setTimeout(() => {
            sendEvent(GA_MAP.time('calendar page', 15));
        }, 15_000);
    }, []);
    return (
        <div className="App">
            <OtpAuth />
            <Routes>
                <Route exact path={process.env.PUBLIC_URL} element={<MainPage />} />
            </Routes>
        </div>
    );
};

export default App;
