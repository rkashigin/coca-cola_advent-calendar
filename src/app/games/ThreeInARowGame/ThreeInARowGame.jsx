import React from 'react';
import PropTypes from 'prop-types';

import useLogic from './useLogic';
import { Timer } from '../../components';

import RedHat from '../../assets/images/Games/RedHat.png';
import GreenHat from '../../assets/images/Games/GreenHat.png';
import RedGloves from '../../assets/images/Games/RedGloves.png';
import Penguin from '../../assets/images/Games/Penguin.png';

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

        if (scores >= 300) {
            setResult({
                status: true,
                promoCode: Math.floor(Math.random() * 2) === 0 ? false : 'DCCC2022'
            });
        }
    }, [scores]);

    const handleTimerComplete = React.useCallback(
        () =>
            setResult({
                status: false
            }),
        []
    );

    return (
        <div className={styles.game}>
            <div className={styles.game__score}>Очки: {scores}</div>
            <Timer
                className={styles.game__timer}
                givenTime={120_000}
                onComplete={handleTimerComplete}
            />
            <div className={styles.game__scoresInfo}>
                <div className={styles.game__scoresInfo__item}>
                    <img src={RedHat} alt="Red Hat" />
                    <p>32x</p>
                </div>
                <div className={styles.game__scoresInfo__item}>
                    <img src={Penguin} alt="Penguin" />
                    <p>8x</p>
                </div>
                <div className={styles.game__scoresInfo__item}>
                    <img src={GreenHat} alt="Green HAT" />
                    <p> 16x</p>
                </div>
                <div className={styles.game__scoresInfo__item}>
                    <img src={RedGloves} alt="Red GLOVES" />
                    <p>4x</p>
                </div>
            </div>
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
