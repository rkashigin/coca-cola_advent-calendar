import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import cn from 'classnames';

import { ReactComponent as WrongAnswer } from '../../assets/icons/icon__bad.svg';
import { ReactComponent as RightAnswer } from '../../assets/icons/icon__good.svg';

import styles from '../Quiz/Quiz.module.scss';

const Riddle = ({ setResult, setScore, riddle }) => {
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
        let timer;

        if (Number.isInteger(selectedAnswer)) {
            timer = setTimeout(() => {
                if (questionNumber + 1 !== riddle.length) {
                    setSelectedAnswer(null);
                    setQuestionNumber((prevNumber) => prevNumber + 1);
                } else {
                    setResult({
                        status: true,
                        promoCode: Math.floor(Math.random() * 2) === 0 ? false : 'DCCC2022'
                    });
                    setScore(rightAnswers.current);
                }
            }, 2500);
        }

        return () => clearTimeout(timer);
    }, [selectedAnswer]);

    return (
        <div className={styles.quiz}>
            <div className={styles.quiz__scores}>
                {questionNumber + 1} / {riddle.length} вопросов
            </div>
            <div className={styles.quiz__question}>
                <h2
                    className={cn(styles.quiz__questionText, {
                        [styles.quiz__questionText_correct]:
                            Number.isInteger(selectedAnswer) &&
                            riddle[questionNumber].answers[selectedAnswer].isCorrect,
                        [styles.quiz__questionText_false]:
                            Number.isInteger(selectedAnswer) &&
                            !riddle[questionNumber].answers[selectedAnswer].isCorrect
                    })}
                >
                    {Number.isInteger(selectedAnswer)
                        ? riddle[questionNumber].answers[selectedAnswer].isCorrect
                            ? riddle[questionNumber].correctExplanation
                            : riddle[questionNumber].correctExplanation
                        : riddle[questionNumber].question}
                </h2>
            </div>
            {riddle[questionNumber].answers.map(({ text, isCorrect }, answerIdx) => (
                <Button
                    type="button"
                    onClick={() => handleSelectAnswer(answerIdx, isCorrect)}
                    key={text}
                    className={cn(styles.quiz__answer, {
                        [styles.quiz__answer_correct]:
                            isCorrect && Number.isInteger(selectedAnswer),
                        [styles.quiz__answer_false]: !isCorrect && answerIdx === selectedAnswer
                    })}
                    disabled={typeof selectedAnswer === 'number'}
                >
                    {text}
                    {isCorrect && Number.isInteger(selectedAnswer) && (
                        <RightAnswer className={styles.quiz__answerIcon} />
                    )}
                    {!isCorrect && answerIdx === selectedAnswer && (
                        <WrongAnswer className={styles.quiz__answerIcon} />
                    )}
                </Button>
            ))}
        </div>
    );
};

Riddle.propTypes = {
    riddle: PropTypes.arrayOf(
        PropTypes.shape({
            question: PropTypes.string,
            answers: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                    isCorrect: PropTypes.bool
                })
            ),
            correctExplanation: PropTypes.string,
            failureExplanation: PropTypes.string
        })
    ).isRequired,
    setResult: PropTypes.func.isRequired,
    setScore: PropTypes.func.isRequired
};

export default Riddle;
