import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { MemoryGame, WhereIsGame, ThreeInARowGame } from '../../games';

import { ReactComponent as CloseIcon } from '../../assets/icons/icon__close.svg';

import styles from './Game.module.scss';
import CatchItemGame from '../../games/CatchItemGame';

const Game = ({ game, fullScreen, test, onClose }) => {
    return (
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
                onClick={onClose}
            >
                {test ? 'Выйти из теста' : 'Выйти из игры'}
                <CloseIcon className={styles.gamesWrapper__closeIcon} />
            </button>
            <div className={styles.gamesWrapper__content}>
                {/* <WhereIsGame gameVariant="easy" /> */}
                {/* <MemoryGame /> */}
                <ThreeInARowGame />
                {/* <CatchItemGame /> */}
            </div>
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
