import React from 'react';
import PropTypes from 'prop-types';

import useLogic from './useLogic';

import styles from './CatchItemGame.module.scss';

const CatchItemGame = ({ setResult }) => {
    const canvasRef = React.useRef(null);
    const [scores, setScores] = React.useState(0);
    const [isCanvasReady, setIsCanvasReady] = React.useState(false);
    const cart = React.useMemo(
        () => ({ x: canvasRef.current?.width / 2, y: canvasRef.current?.height - 150 }),
        [canvasRef.current]
    );
    const { game, handleMouseMove, handleTouch } = useLogic({
        canvasRef: isCanvasReady,
        cart,
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

    React.useEffect(() => {
        if (scores === 300) {
            setResult(true);
        }
    }, [scores]);

    return (
        <div className={styles.game}>
            <div className={styles.game__score}>Очки: {scores}</div>
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
    setResult: PropTypes.func.isRequired
};

export default CatchItemGame;
