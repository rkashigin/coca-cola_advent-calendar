import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Button.module.scss';

const Button = ({ content, className, onClick, children, disabled }) => {
    return (
        <button
            type="button"
            className={classNames(className, styles.button)}
            onClick={onClick}
            disabled={disabled}
        >
            {content}
            {children && children}
        </button>
    );
};

Button.defaultProps = {
    className: '',
    onClick: () => {},
    children: <></>,
    disabled: false
};

Button.propTypes = {
    content: PropTypes.elementType.isRequired,
    className: PropTypes.elementType,
    onClick: PropTypes.func,
    children: PropTypes.node,
    disabled: PropTypes.bool
};

export default Button;
