import React from 'react';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown';

const Timer = React.memo(({ styles, givenTime }) => {
    const timerRenderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            return <span>0:0</span>;
        }

        return (
            <span>
                {minutes}:{seconds}
            </span>
        );
    };

    return (
        <div className={styles.game__timer}>
            <Countdown date={Date.now() + givenTime} renderer={timerRenderer} zeroPadTime={4} />
        </div>
    );
});

Timer.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    styles: PropTypes.object.isRequired,
    givenTime: PropTypes.number.isRequired
};

export default Timer;
