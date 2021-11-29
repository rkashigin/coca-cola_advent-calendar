import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import cn from 'classnames';

import styles from './TruthOrMyth.module.scss';

const TruthOrMyth = ({ setResult, setScore, quiz }) => {
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
                if (questionNumber + 1 !== quiz.length) {
                    setSelectedAnswer(null);
                    setQuestionNumber((prevNumber) => prevNumber + 1);
                } else {
                    setResult({ status: true, promoCode: 'DCCC2022' });
                    setScore(rightAnswers.current);
                }
            }, 2500);
        }

        return () => clearTimeout(timer);
    }, [selectedAnswer]);

    return (
        <div className={styles.quiz}>
            <div className={styles.quiz__scores}>
                {questionNumber + 1} / {quiz.length} вопросов
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
                            ? 'Это правильный ответ'
                            : 'Вы ошиблись'
                        : quiz[questionNumber].question}
                </h2>
                {Number.isInteger(selectedAnswer) && (
                    <>
                        <h2 className={styles.quiz__questionText}>
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
            explanation: PropTypes.string
        })
    ).isRequired,
    setResult: PropTypes.func.isRequired,
    setScore: PropTypes.func.isRequired
};

export default TruthOrMyth;
