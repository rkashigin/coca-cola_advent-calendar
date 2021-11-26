import React from 'react';
import PropTypes from 'prop-types';
import Countdown, { zeroPad } from 'react-countdown';

const Timer = React.memo(({ className, givenTime, onComplete }) => {
    const timerRenderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            return <span>0:0</span>;
        }

        return (
            <span>
                {zeroPad(minutes)}:{zeroPad(seconds)}
            </span>
        );
    };

    return (
        <div className={className}>
            <Countdown
                date={Date.now() + givenTime}
                renderer={timerRenderer}
                zeroPadTime={4}
                onComplete={onComplete}
            />
        </div>
    );
});

Timer.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    className: PropTypes.string.isRequired,
    givenTime: PropTypes.number.isRequired,
    onComplete: PropTypes.func
};

Timer.defaultProps = {
    onComplete: () => {}
};

export default Timer;
