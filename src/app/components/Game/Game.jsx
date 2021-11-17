import React from 'react';
import PropTypes from 'prop-types';

const Game = ({ game, fullScreen, test }) => {
    return <div />;
};

Game.propTypes = {
    game: PropTypes.elementType.isRequired,
    fullScreen: PropTypes.bool,
    test: PropTypes.bool
};

Game.defaultProps = {
    fullScreen: false,
    test: false
};

export default Game;
