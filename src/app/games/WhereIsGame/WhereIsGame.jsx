import React from 'react';
import PropTypes from 'prop-types';

import config from '../../config';

import styles from './WhereIsGame.module.scss';
import { Timer } from '../../components';

const WhereIsGame = ({ gameVariant, setResult }) => {
    const gameConfig = config.references.whereIsGame[gameVariant];
    const [selectionWindowX, setSelectionWindowX] = React.useState('');
    const [selectionWindowY, setSelectionWindowY] = React.useState('');
    const [selectionColor, setSelectionColor] = React.useState('');

    const confirmFind = (x, y) => {
        const { coords } = gameConfig;

        return x >= coords.xStart && x <= coords.xEnd && y >= coords.yStart && y <= coords.yEnd;
    };

    const generateSelectionWindow = ({ x, xChange, y }) => {
        const isFindSuccess = confirmFind(x - xChange, y);

        if (isFindSuccess) {
            setResult(true);
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
            xChange: e.target.x,
            y: e.nativeEvent.offsetY,
            yChange: e.target.y
        });
    };

    return (
        <div className={styles.game}>
            <Timer
                className={styles.game__timer}
                givenTime={2_000}
                onComplete={() => setResult(true)}
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
                src={config.references.whereIsGame[gameVariant].image}
                alt="Game"
                onClick={handlePerformFindAttempt}
            />
        </div>
    );
};

WhereIsGame.propTypes = {
    gameVariant: PropTypes.string.isRequired,
    setResult: PropTypes.func.isRequired
};

export default WhereIsGame;
