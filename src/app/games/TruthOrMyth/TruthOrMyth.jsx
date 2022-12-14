import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import cn from 'classnames';

import config from '../../config';

import styles from './TruthOrMyth.module.scss';
import { RootStore } from '../../stores/RootStore';
import sendEvent, { GA_MAP } from '../../helpers/analytics';

const TruthOrMyth = ({ setResult, setScore, quiz, day }) => {
    const [questionNumber, setQuestionNumber] = React.useState(0);
    const [selectedAnswer, setSelectedAnswer] = React.useState(null);
    const rightAnswers = React.useRef(0);

    const handleSelectAnswer = (answerIdx, isCorrect) => {
        setSelectedAnswer(answerIdx);

        if (isCorrect) {
            rightAnswers.current += 1;
        }
    };
    React.useEffect(() => {
        sendEvent(GA_MAP.time(`game ${day}`, 0));
        const d = Date.now();
        const interval = setInterval(() => {
            sendEvent(GA_MAP.time(`game ${day}`, 10 * Math.round((Date.now() - d) / 10_000)));
        }, 10_000);

        return () => clearInterval(interval);
    }, [day]);

    const game = async () => {
        let timer;

        if (Number.isInteger(selectedAnswer)) {
            timer = setTimeout(async () => {
                if (questionNumber + 1 !== quiz.length) {
                    setSelectedAnswer(null);
                    setQuestionNumber((prevNumber) => prevNumber + 1);
                } else {
                    if (rightAnswers.current >= config.references.testsWinConditions[day]) {
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
                    } else {
                        setResult({
                            status: false
                        });
                    }

                    setScore(rightAnswers.current);
                }
            }, 4_500);
        }

        return timer;
    };

    React.useEffect(() => {
        const timer = game();

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAnswer]);

    return (
        <div className={styles.quiz}>
            <div className={styles.quiz__scores}>
                {questionNumber + 1} / {quiz.length} ????????????????
            </div>
            <div className={styles.quiz__question}>
                <h2
                    className={cn(styles.quiz__questionText, {
                        [styles.quiz__questionText_correct]:
                            Number.isInteger(selectedAnswer) &&
                            quiz[questionNumber].answers[selectedAnswer].isCorrect,
                        [styles.quiz__questionText_false]:
                            Number.isInteger(selectedAnswer) &&
                            !quiz[questionNumber].answers[selectedAnswer].isCorrect
                    })}
                >
                    {Number.isInteger(selectedAnswer)
                        ? quiz[questionNumber].answers[selectedAnswer].isCorrect
                            ? '?????? ???????????????????? ??????????'
                            : '???? ????????????????'
                        : quiz[questionNumber].question}
                </h2>
                {Number.isInteger(selectedAnswer) && (
                    <>
                        <h2 className={styles.quiz__questionText}>
                            {!!quiz[questionNumber].pre &&
                                `${quiz[questionNumber].pre[selectedAnswer]} `}
                            {quiz[questionNumber].explanation}
                        </h2>
                    </>
                )}
            </div>
            <div className={styles.quiz__answers}>
                {quiz[questionNumber].answers.map(({ text, isCorrect }, answerIdx) => (
                    <Button
                        type="button"
                        onClick={() => handleSelectAnswer(answerIdx, isCorrect)}
                        key={text}
                        className={cn(styles.quiz__answer, {
                            [styles.quiz__answer_selected]: answerIdx === selectedAnswer
                        })}
                        disabled={typeof selectedAnswer === 'number'}
                    >
                        {text}
                    </Button>
                ))}
            </div>
        </div>
    );
};

TruthOrMyth.propTypes = {
    quiz: PropTypes.arrayOf(
        PropTypes.shape({
            question: PropTypes.string,
            answers: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                    isCorrect: PropTypes.bool
                })
            ),
            explanation: PropTypes.string,
            pre: PropTypes.arrayOf(PropTypes.string)
        })
    ).isRequired,
    setResult: PropTypes.func.isRequired,
    setScore: PropTypes.func.isRequired,
    day: PropTypes.number.isRequired
};

export default TruthOrMyth;
