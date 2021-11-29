import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import cn from 'classnames';
import config from '../../config';
import { Timer } from '../../components';
import useLogic from './useLogic';
import Adaptive from '../../helpers/Adaptive';

import styles from './WhereIsGame.module.scss';

const WhereIsGame = ({ gameVariant, setResult }) => {
    const isDesktop = useMediaQuery(Adaptive.isDesktop);
    const gameConfig = config.references.whereIsGame[gameVariant];
    const canvasRef = React.useRef(null);
    const [isCanvasReady, setIsCanvasReady] = React.useState(false);
    const { selectionWindowX, selectionWindowY, selectionColor, handlePerformFindAttempt, game } =
        useLogic({
            canvasRef: isCanvasReady,
            image: config.references.whereIsGame[gameVariant].image,
            gameConfig,
            setResult,
            isDesktop
        });

    const handleTimerComplete = React.useCallback(
        () =>
            setResult({
                status: false
            }),
        []
    );

    React.useEffect(() => {
        if (canvasRef.current) {
            setIsCanvasReady(true);
        }

        return () => setIsCanvasReady(false);
    }, []);

    React.useEffect(() => {
        if (isCanvasReady) {
            game();
        }
    }, [isCanvasReady]);

    return (
        <div
            className={cn(styles.game, {
                [styles.game_noOverflow]: isDesktop
            })}
        >
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
            <canvas id="canvas" ref={canvasRef} onClick={handlePerformFindAttempt}>
                Чтобы поиграть в игру, поменяйте браузер
            </canvas>
        </div>
    );
};

WhereIsGame.propTypes = {
    gameVariant: PropTypes.oneOf(['easy', 'hard']).isRequired,
    setResult: PropTypes.func.isRequired
};

export default WhereIsGame;
