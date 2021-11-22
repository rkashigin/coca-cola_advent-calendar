import React from 'react';

import useLogic from './useLogic';

import styles from './CatchItemGame.module.scss';

const CatchItemGame = () => {
    const canvasRef = React.useRef(null);
    const [scores, setScores] = React.useState(0);
    const [isCanvasReady, setIsCanvasReady] = React.useState(false);
    const cart = React.useMemo(
        () => ({ x: canvasRef.current?.width / 2, y: canvasRef.current?.height - 150 }),
        []
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

    // TODO: смотреть мобилка или нет внутри handleMouseMove и внутри handleTouch (если не соответствует нужному девайсу, то return)

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
                Чтобы поиграть в игру, поменяйте, пожалуйста, браузер
            </canvas>
        </div>
    );
};

export default CatchItemGame;
