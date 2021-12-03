import React from 'react';
import PropTypes from 'prop-types';

import useLogic from './useLogic';

import styles from './CatchItemGame.module.scss';
import { Timer } from '../../components';
import sendEvent, { GA_MAP } from '../../helpers/analytics';

const CatchItemGame = ({ setResult, day }) => {
    const canvasRef = React.useRef(null);
    const [scores, setScores] = React.useState(0);
    const [isCanvasReady, setIsCanvasReady] = React.useState(false);
    const cart = React.useMemo(
        () => ({
            x: 0,
            y: 0
        }),
        [canvasRef.current]
    );
    const animationRef = React.useRef(0);
    const { game, handleMouseMove, handleTouch, handleTimerComplete } = useLogic({
        canvasRef: isCanvasReady,
        animationRef: animationRef.current,
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
            animationRef.current = requestAnimationFrame(game);
        }

        return () => cancelAnimationFrame(animationRef.current);
    }, [isCanvasReady]);

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
                givenTime={60_000}
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
