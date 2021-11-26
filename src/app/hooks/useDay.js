import React from 'react';

export default function useDay({ setOpenedDay }) {
    const [open, setOpen] = React.useState(true);
    const [result, setResult] = React.useState({});
    const [score, setScore] = React.useState(0);
    const [resultVisible, setResultVisible] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        setResultVisible(false);
    };

    const handleRestart = () => {
        setResultVisible(false);
        setResult({});
        setScore(0);
        setOpen(true);
    };

    React.useEffect(() => {
        let timer;
        const app = document.querySelector('.App');
        app.style.filter = open ? 'blur(10px)' : '';

        if (!open && !resultVisible) {
            timer = setTimeout(() => setOpenedDay(0), 1000);
        }

        return () => clearTimeout(timer);
    }, [open]);

    React.useEffect(() => {
        if (Object.keys(result).length) {
            setOpen(false);
            setResultVisible(true);
        }
    }, [result]);

    return {
        open,
        result,
        resultVisible,
        setResult,
        setScore,
        handleClose,
        handleRestart
    };
}
