import React from 'react';

import styles from './ThreeInARowGame.module.scss';
import useLogic from './useLogic';

const ThreeInARowGame = () => {
    const canvasRef = React.useRef(null);
    const [scores, setScores] = React.useState(0);
    const [isCanvasReady, setIsCanvasReady] = React.useState(false);
    const { game } = useLogic({
        canvasRef: isCanvasReady,
        setScores
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

    return (
        <div className={styles.game}>
            <div className={styles.game__score}>Очки: 120</div>
            <div className={styles.game__timer}>01:32</div>
            <canvas id="canvas" ref={canvasRef} className={styles.game__board}>
                Чтобы поиграть в игру, поменяйте браузер
            </canvas>
        </div>
    );
};

export default ThreeInARowGame;
