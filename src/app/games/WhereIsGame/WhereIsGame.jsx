import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import config from '../../config';
import { Timer } from '../../components';
import Adaptive from '../../helpers/Adaptive';
import useLogic from './useLogic';

import styles from './WhereIsGame.module.scss';
import sendEvent, { GA_MAP } from '../../helpers/analytics';

const WhereIsGame = ({ gameVariant, setResult, day }) => {
    const gameConfig = config.references.whereIsGame[gameVariant];
    const imageRef = React.useRef(null);
    const { handlePerformFindAttempt, handleTimerComplete } = useLogic({
        imageRef,
        gameConfig,
        setResult,
        day
    });

    React.useEffect(() => {
        sendEvent(GA_MAP.time(`game ${day}`, 0));
        const d = Date.now();
        const interval = setInterval(() => {
            sendEvent(GA_MAP.time(`game ${day}`, 10 * Math.round((Date.now() - d) / 10_000)));
        }, 10_000);

        return () => clearInterval(interval);
    }, [day]);

    return (
        <div className={styles.game}>
            <Timer
                className={styles.game__timer}
                givenTime={300_000}
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
