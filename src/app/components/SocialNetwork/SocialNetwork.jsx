import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ReactComponent as FacebookIcon } from '../../assets/icons/fb.svg';
import { ReactComponent as TwitterIcon } from '../../assets/icons/twitter.svg';
import { ReactComponent as VkIcon } from '../../assets/icons/vk.svg';

import styles from './SocialNetwork.module.scss';

const SocialNetwork = ({ className, onClick }) => {
    return (
        <div className={classNames(styles.socialNetwork, className)}>
            <button
                onClick={() => onClick('facebook')}
                type="button"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialNetwork__link}
            >
                <FacebookIcon
                    className={classNames(
                        styles.socialNetwork__icon,
                        styles.socialNetwork__icon_facebook
                    )}
                />
            </button>
            <button
                onClick={() => onClick('twitter')}
                type="button"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialNetwork__link}
            >
                <TwitterIcon
                    className={classNames(
                        styles.socialNetwork__icon,
                        styles.socialNetwork__icon_twitter
                    )}
                />
            </button>
            <button
                onClick={() => onClick('vk')}
                type="button"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialNetwork__link}
            >
                <VkIcon
                    className={classNames(
                        styles.socialNetwork__icon,
                        styles.socialNetwork__icon_vk
                    )}
                />
            </button>
        </div>
    );
};

SocialNetwork.defaultProps = {
    className: '',
    onClick: () => {}
};

SocialNetwork.propTypes = {
    className: PropTypes.elementType,
    onClick: PropTypes.func
};

export default SocialNetwork;
