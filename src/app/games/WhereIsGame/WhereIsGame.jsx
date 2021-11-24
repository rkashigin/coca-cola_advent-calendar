import React from 'react';
import PropTypes from 'prop-types';

import config from '../../config';

import Game from '../../assets/images/firstGame.svg';

import styles from './WhereIsGame.module.scss';

const WhereIsGame = ({ gameVariant, setResult }) => {
    const gameConfig = config.references.whereIsGame[gameVariant];
    const [xPos, setXPos] = React.useState('');
    const [yPos, setYPos] = React.useState('');
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
        setXPos(e.nativeEvent.offsetX);
        setYPos(e.nativeEvent.offsetY);

        generateSelectionWindow({
            x: e.nativeEvent.offsetX,
            xChange: e.target.x,
            y: e.nativeEvent.offsetY,
            yChange: e.target.y
        });
    };

    return (
        <div className={styles.game}>
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
            <img src={Game} alt="Game" onClick={handlePerformFindAttempt} />
        </div>
    );
};

WhereIsGame.propTypes = {
    gameVariant: PropTypes.string.isRequired,
    setResult: PropTypes.func.isRequired
};

export default WhereIsGame;
