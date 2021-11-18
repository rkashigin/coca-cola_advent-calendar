import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { MemoryGame, WhereIsGame } from '../../games';

import { ReactComponent as CloseIcon } from '../../assets/icons/icon__close.svg';

import styles from './Game.module.scss';

const Game = ({ game, fullScreen, test, onClose }) => {
    return (
        <div
            className={cn(styles.game, {
                [styles.game_fullScreen]: fullScreen
            })}
        >
            <button
                type="button"
                className={cn(styles.game__exitButton, {
                    [styles.game__exitButton_fixed]: fullScreen
                })}
                onClick={onClose}
            >
                {test ? 'Выйти из теста' : 'Выйти из игры'}
                <CloseIcon className={styles.game__closeIcon} />
            </button>
            {/* <WhereIsGame gameVariant="easy" /> */}
            <MemoryGame />
        </div>
    );
};

Game.propTypes = {
    game: PropTypes.elementType.isRequired,
    onClose: PropTypes.func.isRequired,
    fullScreen: PropTypes.bool,
    test: PropTypes.bool
};

Game.defaultProps = {
    fullScreen: false,
    test: false
};

export default Game;
