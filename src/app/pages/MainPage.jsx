import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import Adaptive from '../helpers/Adaptive';

import ProfileBanner from '../components/ProfileBanner/ProfileBanner';
import Header from '../components/Header/Header';
import Calendar from '../components/Calendar/Calendar';
import Footer from '../components/Footer/Footer';

// import styles from './MainPage.module.scss';

const MainPage = () => {
    // const [auth, setAuth] = useState(true);

    // const isMobile = useMediaQuery(Adaptive.isMobile);

    // useEffect(() => {
    //     const app = document.querySelector('.App');
    //     app.style.paddingTop = auth && !isMobile ? '4rem' : '0';
    // }, [auth]);

    return (
        <>
            <ProfileBanner />
            <Header />
            <main>
                <Calendar />
            </main>
            <Footer />
        </>
    );
};

export default MainPage;
