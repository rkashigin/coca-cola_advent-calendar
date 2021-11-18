import React from 'react';

import Header from '../components/Header/Header';
import Calendar from '../components/Calendar/Calendar';
import Footer from '../components/Footer/Footer';

import styles from './MainPage.module.scss';

const MainPage = () => {
    return (
        <>
            <Header />
            <main>
                <Calendar />
            </main>
            <Footer />
        </>
    );
};

export default MainPage;
