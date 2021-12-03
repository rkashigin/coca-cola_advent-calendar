import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as CloseIcon } from '../../assets/icons/icon__close.svg';

import styles from './Game.module.scss';

const Game = ({ game, fullScreen, test, handleClose, disableStyles }) => {
    React.useEffect(() => {
        const app = document.querySelector('.App');
        app.style.filter = 'blur(10px)';

        return () => {
            app.style.filter = '';
        };
    }, []);

    return disableStyles ? (
        <>
            <button
                type="button"
                className={cn(styles.gamesWrapper__exitButton, {
                    [styles.gamesWrapper__exitButton_fixed]: fullScreen
                })}
                onClick={handleClose}
            >
                {test ? 'Выйти из теста' : 'Выйти из игры'}
                <CloseIcon className={styles.gamesWrapper__closeIcon} />
            </button>
            {game}
        </>
    ) : (
        <div
            className={cn(styles.gamesWrapper, {
                [styles.gamesWrapper_fullScreen]: fullScreen
            })}
        >
            <button
                type="button"
                className={cn(styles.gamesWrapper__exitButton, {
                    [styles.gamesWrapper__exitButton_fixed]: fullScreen
                })}
                onClick={handleClose}
            >
                {test ? 'Выйти из теста' : 'Выйти из игры'}
                <CloseIcon className={styles.gamesWrapper__closeIcon} />
            </button>
            <div className={styles.gamesWrapper__content}>{game}</div>
        </div>
    );
};

Game.propTypes = {
    game: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    handleClose: PropTypes.func.isRequired,
    fullScreen: PropTypes.bool,
    test: PropTypes.bool,
    disableStyles: PropTypes.bool
};

Game.defaultProps = {
    fullScreen: false,
    test: false,
    disableStyles: false
};

export default Game;
