import React from 'react';

import Header from '../components/Header/Header';
import Calendar from '../components/Calendar/Calendar';
import Footer from '../components/Footer/Footer';

import styles from './MainPage.module.scss';

const MainPage = () => {
    return (
        <main>
            <Header />
            <Calendar />
            <Footer />
        </main>
    );
};

export default MainPage;
