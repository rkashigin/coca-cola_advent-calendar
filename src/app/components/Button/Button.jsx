import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Button.module.scss';

const Button = ({ content, className, onClick, children }) => {
    return (
        <button type="button" className={classNames(className, styles.button)} onClick={onClick}>
            {content}
            {children && children}
        </button>
    );
};

Button.defaultProps = {
    className: '',
    onClick: () => {},
    children: <></>
};

Button.propTypes = {
    content: PropTypes.elementType.isRequired,
    className: PropTypes.elementType,
    onClick: PropTypes.func,
    children: PropTypes.node
};

export default Button;
