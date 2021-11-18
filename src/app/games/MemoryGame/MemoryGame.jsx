import React from 'react';
import { shuffle } from 'lodash';
import cn from 'classnames';

import Images from './images';

import styles from './MemoryGame.module.scss';

const MemoryGame = () => {
    const [cards] = React.useState(shuffle([...Images, ...Images]));
    const [activeCards, setActiveCards] = React.useState([]);
    const [foundPairs, setFoundPairs] = React.useState([]);
    const [won, setWon] = React.useState(false);

    const flipCard = (index) => {
        if (activeCards.length === 2) return;

        if (activeCards.length) {
            const firstIndex = activeCards[0];
            const secondsIndex = index;
            if (cards[firstIndex] === cards[secondsIndex]) {
                if (foundPairs.length + 2 === cards.length) {
                    setWon(true);
                }
                setFoundPairs([...foundPairs, firstIndex, secondsIndex]);
            }
            setActiveCards([...activeCards, index]);
        } else {
            setActiveCards([index]);
        }
    };

    React.useEffect(() => {
        let timer;

        if (activeCards.length === 2) {
            timer = setTimeout(() => setActiveCards([]), 500);
        }

        return () => clearTimeout(timer);
    }, [activeCards]);

    return (
        <div className={styles.game}>
            <div className={styles.game__score}>
                {`${foundPairs.length / 2} / ${cards.length / 2}`} пар
            </div>
            <div className={styles.game__board}>
                {cards.map((card, cardIdx) => {
                    const flippedToFront =
                        activeCards.indexOf(cardIdx) !== -1 || foundPairs.indexOf(cardIdx) !== -1;

                    return (
                        <div
                            className={cn(styles.board__cardWrapper, {
                                [styles.board__cardWrapper_flipped]: flippedToFront
                            })}
                            onClick={() => flipCard(cardIdx)}
                        >
                            <div className={styles.board__card}>
                                <div className={styles.card__front}>
                                    <img src={card} alt="Card front" />
                                </div>
                                <div className={styles.card__back} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MemoryGame;
