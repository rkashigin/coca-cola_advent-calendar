import React from 'react';

import styles from './ThreeInARow.module.scss';

const width = 5;

const colors = ['blue', 'green', 'orange', 'purple', 'red', 'yellow'];

const ThreeInARow = () => {
    const [currentBoard, setCurrentBoard] = React.useState([]);

    const createBoard = () => {
        const board = [];

        for (let i = 0; i < width ** 2; i += 1) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            board.push(randomColor);
        }

        setCurrentBoard(board);
    };

    // TODO: проверяем 4?

    const checkForColumnOfThree = () => {
        for (let i = 0; i < width * (width - 2); i += 1) {
            const columnOfThree = [i, i + width, i + 2 * width];
            const decidedColor = currentBoard[i];

            if (columnOfThree.every((item) => currentBoard[item] === decidedColor)) {
                columnOfThree.forEach((item) => {
                    currentBoard[item] = '';
                });
            }
        }
    };

    const checkForRowOfThree = () => {
        for (let i = 0; i < width * width; i += 1) {
            if ((i + 1) * width - i <= 2) continue;

            const rowOfThree = [i, i + 1, i + 2];
            const decidedColor = currentBoard[i];

            if (rowOfThree.every((item) => currentBoard[item] === decidedColor)) {
                rowOfThree.forEach((item) => {
                    currentBoard[item] = '';
                });
            }
        }
    };

    React.useEffect(createBoard, []);

    React.useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfThree();
            checkForRowOfThree();

            setCurrentBoard([...currentBoard]);
        }, 100);

        return () => clearInterval(timer);
    }, [currentBoard]);

    return (
        <div className={styles.game}>
            <div className={styles.game__score}>Очки: 120</div>
            <div className={styles.game__timer}>01:32</div>
            <div className={styles.game__board}>
                {currentBoard.map((item) => (
                    <div className={styles.game__boardItem}>
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <img style={{ backgroundColor: item }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThreeInARow;
