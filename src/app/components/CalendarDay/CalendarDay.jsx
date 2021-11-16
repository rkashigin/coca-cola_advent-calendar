import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './CalendarDay.module.scss';

const CalendarDay = ({
	id, date, img, className, classNameImg, classNameSpan 
}) => {
	return (
		<div className={classNames(className, styles.calendarDay)}>
			<span className={classNames(classNameSpan, styles.calendarDay__date)}>{date}</span>
			<img className={classNames(classNameImg, styles.calendarDay__img)} src={img} alt="" />
		</div>
	);
};

CalendarDay.defaultProps = {
	className: '',
	classNameImg: '',
	classNameSpan: ''
};

CalendarDay.propTypes = {
	id: PropTypes.number.isRequired,
	date: PropTypes.number.isRequired,
	img: PropTypes.string.isRequired,
	className: PropTypes.elementType,
	classNameImg: PropTypes.elementType,
	classNameSpan: PropTypes.elementType
};

export default CalendarDay;
