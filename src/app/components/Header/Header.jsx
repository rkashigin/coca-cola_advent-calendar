import React, { useEffect } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import PromoCode from '../PromoCode/PromoCode';
import config from '../../config';

import { ReactComponent as Feat } from '../../assets/icons/Logo_ft.svg';
import { ReactComponent as Delivery } from '../../assets/icons/Logo_delivery.svg';
import { ReactComponent as Cola } from '../../assets/icons/Logo_cola.svg';

import styles from './Header.module.scss';
import { RootStore } from '../../stores/RootStore';

const Header = observer(() => {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const app = document.querySelector('.App');
        app.style.filter = open ? 'blur(10px)' : '';
    }, [open]);

    const handleClickOpen = () => {
        if (RootStore.myPromocodes.length) {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <header className={styles.header}>
                {/* <div className={styles.header__logoWrap}> */}
                <div
                    className={classNames(styles.header__logo, {
                        [styles.header__logo_auth]: !!RootStore.user.id
                    })}
                >
                    <div className={styles.header__bandsWrap}>
                        <img
                            className={styles.header__band_red}
                            src={require('../../assets/images/Header_band_red.png').default}
                            alt="band"
                        />
                        <img
                            className={styles.header__band_green}
                            src={require('../../assets/images/Header_band_green.png').default}
                            alt="band"
                        />
                    </div>
                    <div className={styles.header__brand}>
                        <Cola className={styles.header__logoCola} />
                        <Feat className={styles.header__Logofeat} />
                        <Delivery className={styles.header__logoDelivery} />
                    </div>
                </div>
                {/* </div> */}
                <h1 className={styles.header__title}>Погрузитесь в волшебную атмосферу </h1>
                <p className={styles.header__subTitle}>
                    C advent-календарем, мини-играми и приятными подарками
                </p>
                <div className={styles.header__buttonsWrap}>
                    {/* <Button content="Победители" className={styles.header__button_winners} /> */}
                    {!!RootStore.myPromocodes.length && (
                        <Button
                            content="Мои промокоды"
                            onClick={handleClickOpen}
                            className={styles.header__button_promoCodes}
                            disabled={!RootStore.myPromocodes.length}
                        />
                    )}
                </div>
                <img
                    className={styles.header__band_bottom}
                    src={require('../../assets/images/Header_band_bottom.png').default}
                    alt="band"
                />
            </header>
            <Modal title="Мои промокоды" handleClose={handleClose} open={open}>
                {RootStore.colaAuth &&
                    !!RootStore.myPromocodes.length &&
                    RootStore.myPromocodes.map((el) => (
                        <PromoCode
                            key={el.ID}
                            type="grey"
                            promoCodeText={config.references.promocodesDescriptions[el.Type]}
                            promoCode={el.Value}
                        />
                    ))}
                <span className={styles.header__promoInfo}>Срок действия промокода 31.01.2022</span>
            </Modal>
        </>
    );
});

// Header.propTypes = {
//     auth: PropTypes.bool.isRequired
// };

export default Header;
