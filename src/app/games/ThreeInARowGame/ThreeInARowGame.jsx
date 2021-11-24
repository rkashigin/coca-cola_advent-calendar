import React from 'react';
import PropTypes from 'prop-types';

import useLogic from './useLogic';
import { Timer } from '../../components';

import styles from './ThreeInARowGame.module.scss';

const ThreeInARowGame = ({ setResult, setScore }) => {
    const canvasRef = React.useRef(null);
    const [scores, setScores] = React.useState(0);
    const [isCanvasReady, setIsCanvasReady] = React.useState(false);
    const { canvas, game, onMouseMove, onMouseDown, onMouseUp, onMouseOut } = useLogic({
        canvasRef: isCanvasReady,
        setScores
    });

    React.useEffect(() => {
        if (canvasRef.current) {
            setIsCanvasReady(true);
        }

        return () => {
            canvas?.removeEventListener('mousemove', onMouseMove);
            canvas?.removeEventListener('mousedown', onMouseDown);
            canvas?.removeEventListener('mouseup', onMouseUp);
            canvas?.removeEventListener('mouseout', onMouseOut);
        };
    }, []);

    React.useEffect(() => {
        if (isCanvasReady) {
            game();
        }
    }, [isCanvasReady]);

    React.useEffect(() => {
        setScore(scores);

        if (scores === 300) {
            setResult(true);
        }
    }, [scores]);

    return (
        <div className={styles.game}>
            <div className={styles.game__score}>Очки: {scores}</div>
            <Timer className={styles.game__timer} givenTime={120_000} />
            <canvas id="canvas" ref={canvasRef} className={styles.game__board}>
                Чтобы поиграть в игру, поменяйте браузер
            </canvas>
        </div>
    );
};

ThreeInARowGame.propTypes = {
    setResult: PropTypes.func.isRequired,
    setScore: PropTypes.func.isRequired
};

export default ThreeInARowGame;
