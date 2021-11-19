import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Button.module.scss';

const Button = ({ content, className, onClick }) => {
    return (
        <button type="button" className={classNames(className, styles.button)} onClick={onClick}>
            {content}
        </button>
    );
};

Button.defaultProps = {
    className: '',
    onClick: () => {}
};

Button.propTypes = {
    content: PropTypes.elementType.isRequired,
    className: PropTypes.elementType,
    onClick: PropTypes.func
};

export default Button;
