/* eslint-disable react/no-array-index-key */
import React from 'react';
import { shuffle } from 'lodash';
import cn from 'classnames';

import PropTypes from 'prop-types';
import Images from './images';
import { Timer } from '../../components';

import styles from './MemoryGame.module.scss';
import { RootStore } from '../../stores/RootStore';
import sendEvent, { GA_MAP } from '../../helpers/analytics';

const MemoryGame = ({ setResult, setScore, day }) => {
    const [cards] = React.useState(shuffle([...Images, ...Images]));
    const [activeCards, setActiveCards] = React.useState([]);
    const [foundPairs, setFoundPairs] = React.useState([]);

    const flipCard = async (index) => {
        if (activeCards.indexOf(index) !== -1 || foundPairs.indexOf(index) !== -1) return;

        if (activeCards.length === 2) return;

        if (activeCards.length) {
            const firstIndex = activeCards[0];
            const secondsIndex = index;
            if (cards[firstIndex] === cards[secondsIndex]) {
                if (foundPairs.length + 2 === cards.length) {
                    try {
                        const data = await RootStore.dayComplete(day);

                        setResult({
                            status: true,
                            promoCode: data.promocode || false
                        });
                    } catch {
                        setResult({
                            status: true,
                            promoCode: false
                        });
                    }
                }
                setFoundPairs([...foundPairs, firstIndex, secondsIndex]);
            }
            setActiveCards([...activeCards, index]);
        } else {
            setActiveCards([index]);
        }
    };

    const handleTimerComplete = React.useCallback(() => setResult({ status: false }), []);

    React.useEffect(() => {
        let timer;

        if (activeCards.length === 2) {
            timer = setTimeout(() => setActiveCards([]), 500);
        }

        return () => clearTimeout(timer);
    }, [activeCards]);

    React.useEffect(() => {
        if (foundPairs.length) {
            setScore(foundPairs.length);
        }
    }, [foundPairs]);

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
            <div className={styles.game__score}>
                {`${foundPairs.length / 2} / ${cards.length / 2}`} пар
            </div>
            <Timer
                className={styles.game__timer}
                givenTime={90_000}
                onComplete={handleTimerComplete}
            />
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
                            key={cardIdx}
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

MemoryGame.propTypes = {
    setResult: PropTypes.func.isRequired,
    setScore: PropTypes.func.isRequired,
    day: PropTypes.number.isRequired
};

export default MemoryGame;
