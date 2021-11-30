import React from 'react';
import { Route } from 'react-router-dom';

import { Routes } from 'react-router';
import MainPage from './pages/MainPage';

import OtpAuth from './components/OtpAuth/OtpAuth';

const App = () => {
    return (
        <div className="App">
            <OtpAuth />
            <Routes>
                <Route exact path="/" element={<MainPage />} />
            </Routes>
        </div>
    );
};

export default App;
