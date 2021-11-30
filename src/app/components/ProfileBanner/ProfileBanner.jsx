import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { observer } from 'mobx-react-lite';
import { IMask } from 'react-imask';
import Button from '../Button/Button';

import styles from './ProfileBanner.module.scss';
import { RootStore } from '../../stores/RootStore';

const masked = IMask.createMask({
    mask: '+7 (000) 000-00-00'
});

const ProfileBanner = observer(({ className }) => {
    return (
        <>
            {!!RootStore.user.id && (
                <div className={classNames(className, styles.profileBanner)}>
                    <span className={styles.profileBanner__number}>
                        {masked.resolve(String(RootStore.user.phone))}
                    </span>
                    <Button className={styles.profileBanner__button} content="Выйти из профиля" />
                </div>
            )}
        </>
    );
});

ProfileBanner.defaultProps = {
    className: ''
};

ProfileBanner.propTypes = {
    className: PropTypes.elementType
};

export default ProfileBanner;
