import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import config from '../../config';
import { Timer } from '../../components';
import Adaptive from '../../helpers/Adaptive';
import useLogic from './useLogic';

import styles from './WhereIsGame.module.scss';

const WhereIsGame = ({ gameVariant, setResult, day }) => {
    const gameConfig = config.references.whereIsGame[gameVariant];
    const imageRef = React.useRef(null);
    const { handlePerformFindAttempt, handleTimerComplete } = useLogic({
        imageRef,
        gameConfig,
        setResult,
        day
    });

    return (
        <div className={styles.game}>
            <Timer
                className={styles.game__timer}
                givenTime={120_000}
                onComplete={handleTimerComplete}
            />
            <img
                ref={imageRef}
                src={gameConfig.image}
                alt="Game"
                onClick={handlePerformFindAttempt}
            />
        </div>
    );
};

WhereIsGame.propTypes = {
    gameVariant: PropTypes.oneOf(['easy', 'hard']).isRequired,
    setResult: PropTypes.func.isRequired,
    day: PropTypes.number.isRequired
};

export default WhereIsGame;
