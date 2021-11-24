import React from 'react';
import Countdown from 'react-countdown';

import styles from './ThreeInARowGame.module.scss';
import useLogic from './useLogic';
import { Timer } from '../../components';

const ThreeInARowGame = () => {
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

    return (
        <div className={styles.game}>
            <div className={styles.game__score}>Очки: {scores}</div>
            <Timer styles={styles} givenTime={120_000} />
            <canvas id="canvas" ref={canvasRef} className={styles.game__board}>
                Чтобы поиграть в игру, поменяйте браузер
            </canvas>
        </div>
    );
};

export default ThreeInARowGame;
