import React from 'react';
import { Route } from 'react-router-dom';

import { Routes } from 'react-router';
import MainPage from './pages/MainPage';

// TODO: проверить профайлер на ререндеры

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<MainPage />} />
            </Routes>
        </div>
    );
};

export default App;
