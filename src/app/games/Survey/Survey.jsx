import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

import styles from './Survey.module.scss';
import { RootStore } from '../../stores/RootStore';
import sendEvent, { GA_MAP } from '../../helpers/analytics';

const Survey = ({ setResult, survey, day }) => {
    const [questionNumber, setQuestionNumber] = React.useState(0);
    const [selectedAnswer, setSelectedAnswer] = React.useState(null);

    const handleSelectAnswer = (answerIdx) => setSelectedAnswer(answerIdx);

    const game = async () => {
        if (Number.isInteger(selectedAnswer)) {
            if (questionNumber + 1 !== survey.length) {
                setSelectedAnswer(null);
                setQuestionNumber((prevNumber) => prevNumber + 1);
            } else {
                const resultsArray = ['A', 'B', 'C', 'D'];
                const randomResult = Math.floor(Math.random() * 4);

                try {
                    const data = await RootStore.dayComplete(day);

                    setResult({
                        status: resultsArray[randomResult],
                        promoCode: data.promocode || false
                    });
                } catch {
                    setResult({
                        status: resultsArray[randomResult],
                        promoCode: false
                    });
                }
            }
        }
    };

    React.useEffect(() => {
        game();
    }, [selectedAnswer]);

    React.useEffect(() => {
        sendEvent(GA_MAP.time(`game ${day}`, 0));
        const d = Date.now();
        const interval = setInterval(() => {
            sendEvent(GA_MAP.time(`game ${day}`, 10 * Math.round((Date.now() - d) / 10_000)));
        }, 10_000);

        return () => clearInterval(interval);
    }, [day]);

    return (
        <div className={styles.survey}>
            <div className={styles.survey__scores}>
                {questionNumber + 1} / {survey.length} вопросов
            </div>
            <div className={styles.survey__question}>
                <h2 className={styles.survey__questionText}>{survey[questionNumber].question}</h2>
            </div>
            <div className={styles.survey__answers}>
                {survey[questionNumber].answers.map((answer, answerIdx) => (
                    <Button
                        type="button"
                        onClick={() => handleSelectAnswer(answerIdx)}
                        key={answer}
                        className={styles.survey__answer}
                    >
                        {answer}
                    </Button>
                ))}
            </div>
        </div>
    );
};

Survey.propTypes = {
    survey: PropTypes.arrayOf(
        PropTypes.shape({
            question: PropTypes.string,
            answers: PropTypes.arrayOf(PropTypes.string)
        })
    ).isRequired,
    setResult: PropTypes.func.isRequired,
    day: PropTypes.number.isRequired
};

export default Survey;
