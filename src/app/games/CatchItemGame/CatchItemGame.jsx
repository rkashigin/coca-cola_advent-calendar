import React from 'react';
import PropTypes from 'prop-types';

import useLogic from './useLogic';

import styles from './CatchItemGame.module.scss';
import { Timer } from '../../components';

const CatchItemGame = ({ setResult, day }) => {
    const canvasRef = React.useRef(null);
    const [scores, setScores] = React.useState(0);
    const [isCanvasReady, setIsCanvasReady] = React.useState(false);
    const cart = React.useMemo(
        () => ({
            x: 0,
            prevX: 0,
            y: 0,
            prevY: 0
        }),
        [canvasRef.current]
    );
    const { game, handleMouseMove, handleTouch, checkScores, handleTimerComplete } = useLogic({
        canvasRef: isCanvasReady,
        cart,
        setScores,
        setResult,
        day
    });

    React.useEffect(() => {
        if (canvasRef.current) {
            setIsCanvasReady(true);
        }
    }, []);

    React.useEffect(() => {
        if (isCanvasReady) {
            game();
        }
    }, [isCanvasReady]);

    React.useEffect(() => checkScores(scores), [scores]);

    return (
        <div className={styles.game}>
            <Timer
                className={styles.game__timer}
                givenTime={120_000}
                onComplete={handleTimerComplete}
            />
            <div className={styles.game__score}>{scores}</div>
            <canvas
                id="canvas"
                ref={canvasRef}
                className={styles.game__board}
                onMouseMove={handleMouseMove}
                onTouchEnd={handleTouch}
            >
                Чтобы поиграть в игру, поменяйте браузер
            </canvas>
        </div>
    );
};

CatchItemGame.propTypes = {
    setResult: PropTypes.func.isRequired,
    day: PropTypes.number.isRequired
};

export default CatchItemGame;
