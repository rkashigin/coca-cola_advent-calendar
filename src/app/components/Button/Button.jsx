import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Button.module.scss';

const Button = ({ content, className }) => {
    return (
        <button type="button" className={classNames(className, styles.button)}>
            {content}
        </button>
    );
};

Button.defaultProps = {
    className: ''
};

Button.propTypes = {
    content: PropTypes.elementType.isRequired,
    className: PropTypes.elementType
};

export default Button;
