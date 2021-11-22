import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../Button/Button';

import styles from './ProfileBanner.module.scss';

const ProfileBanner = ({ className }) => {
    const [auth, setAuth] = useState(true);

    const phoneNumber = '+7(900) 000-00-00';

    return (
        <div className={classNames(className, styles.profileBanner)}>
            <span className={styles.profileBanner__number}>{phoneNumber}</span>
            <Button className={styles.profileBanner__button} content="Выйти из профиля" />
        </div>
    );
};

ProfileBanner.defaultProps = {
    className: ''
};

ProfileBanner.propTypes = {
    className: PropTypes.elementType
};

export default ProfileBanner;
