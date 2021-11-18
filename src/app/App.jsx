import React from 'react';
import { Route } from 'react-router-dom';

import { Routes } from 'react-router';
import MainPage from './pages/MainPage';
import { Game } from './components';

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<MainPage />} />
                <Route path="/game" element={<Game />} />
            </Routes>
        </div>
    );
};

export default App;
