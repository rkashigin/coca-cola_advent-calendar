import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import styles from './CalendarDay.module.scss';

const Transition = React.forwardRef((props, ref) => {
	return <Slide direction="up" ref={ref} {...props} />;
});

const CalendarDay = ({
	id, date, img, className, classNameImg, classNameSpan 
}) => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div className={classNames(className, styles.calendarDay)} onClick={handleClickOpen}>
				<span className={classNames(classNameSpan, styles.calendarDay__date)}>{date}</span>
				<img className={classNames(classNameImg, styles.calendarDay__img)} src={img} alt="" />
			</div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
				className={styles.popup}
			>
				<DialogTitle>Use Google location service?</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Let Google help apps determine location. This means sending anonymous
						location data to Google, even when no apps are running.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Disagree</Button>
					<Button onClick={handleClose}>Agree</Button>
				</DialogActions>
			</Dialog>
		</>
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
