import React from 'react';
import { Route } from 'react-router-dom';

import { Routes } from 'react-router';
import MainPage from './pages/MainPage';
import { Game } from './components';

// TODO: проверить профайлер на ререндеры

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<MainPage />} />
                <Route path="/game" element={<Game fullScreen />} />
            </Routes>
        </div>
    );
};

export default App;
