import React from 'react';

import ProfileBanner from '../components/ProfileBanner/ProfileBanner';
import Header from '../components/Header/Header';
import Calendar from '../components/Calendar/Calendar';
import Footer from '../components/Footer/Footer';

const MainPage = () => {
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
