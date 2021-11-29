import React from 'react';
import PropTypes from 'prop-types';

import { useMediaQuery } from 'react-responsive';
import cn from 'classnames';
import config from '../../config';

import styles from './WhereIsGame.module.scss';
import { Timer } from '../../components';
import Adaptive from '../../helpers/Adaptive';

const WhereIsGame = ({ gameVariant, setResult }) => {
    const isMobile = useMediaQuery(Adaptive.isMobile);
    const gameConfig = config.references.whereIsGame[gameVariant];
    const [selectionWindowX, setSelectionWindowX] = React.useState('');
    const [selectionWindowY, setSelectionWindowY] = React.useState('');
    const [selectionColor, setSelectionColor] = React.useState('');

    const confirmFind = (x, y) => {
        const { coords } = gameConfig;

        return x >= coords.xStart && x <= coords.xEnd && y >= coords.yStart && y <= coords.yEnd;
    };

    const generateSelectionWindow = ({ x, y }) => {
        const isFindSuccess = confirmFind(x, y);

        if (isFindSuccess) {
            setResult({
                status: true,
                promoCode: Math.floor(Math.random() * 2) === 0 ? false : 'DCCC2022'
            });
            setSelectionColor('green');
        } else {
            setSelectionColor('red');
        }

        setSelectionWindowX(x);
        setSelectionWindowY(y);
    };

    const handlePerformFindAttempt = (e) => {
        generateSelectionWindow({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY
        });
    };

    const handleTimerComplete = React.useCallback(
        () =>
            setResult({
                status: false
            }),
        []
    );

    return (
        <div className={styles.game}>
            <Timer
                className={styles.game__timer}
                givenTime={120_000}
                onComplete={handleTimerComplete}
            />
            <div
                className={styles.selectionWindow}
                style={
                    selectionWindowX && selectionWindowY
                        ? {
                              left: selectionWindowX - 25,
                              top: selectionWindowY - 25,
                              display: 'block',
                              borderColor: selectionColor
                          }
                        : null
                }
            />
            <img
                className={cn({
                    [styles.image]: !isMobile
                })}
                src={config.references.whereIsGame[gameVariant].image}
                alt="Game"
                onClick={handlePerformFindAttempt}
            />
        </div>
    );
};

WhereIsGame.propTypes = {
    gameVariant: PropTypes.oneOf(['easy', 'hard']).isRequired,
    setResult: PropTypes.func.isRequired
};

export default WhereIsGame;
