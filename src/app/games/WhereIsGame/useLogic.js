import React from 'react';

export default function useLogic({ imageRef, gameConfig, setResult, isMobile }) {
    const [selectionWindowX, setSelectionWindowX] = React.useState('');
    const [selectionWindowY, setSelectionWindowY] = React.useState('');
    const [selectionColor, setSelectionColor] = React.useState('');
    const [ratio, setRatio] = React.useState({});

    const confirmFind = (x, y) => {
        const { coords } = gameConfig;

        const compareCoords = {
            xStart: Math.floor(coords.xStart / ratio.width),
            xEnd: Math.floor(coords.xEnd / ratio.width),
            yStart: Math.floor(coords.yStart / ratio.height),
            yEnd: Math.floor(coords.yEnd / ratio.height)
        };

        return (
            x >= compareCoords.xStart &&
            x <= compareCoords.xEnd &&
            y >= compareCoords.yStart &&
            y <= compareCoords.yEnd
        );
    };

    const generateSelectionWindow = ({ x, y }) => {
        const isFindSuccess = confirmFind(x, y);

        if (isFindSuccess) {
            setResult({
                status: true,
                promoCode: Math.floor(Math.random() * 2) === 0 ? false : 'DCCC2022'
            });
            setSelectionColor('green');
        } else {
            setSelectionColor('red');
        }

        setSelectionWindowX(x);
        setSelectionWindowY(y);
    };

    const handlePerformFindAttempt = (e) => {
        const rect = imageRef.current.getBoundingClientRect();
        const mousePosition = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        generateSelectionWindow({ x: mousePosition.x, y: mousePosition.y });
    };

    const handleTimerComplete = React.useCallback(
        () =>
            setResult({
                status: false
            }),
        []
    );

    React.useEffect(() => {
        const gameImage = new Image();

        gameImage.onload = () => {
            if (isMobile) {
                imageRef.current.width = gameImage.width;
                imageRef.current.height = gameImage.height;
            } else {
                imageRef.current.width = window.innerWidth;
                imageRef.current.height = window.innerHeight;
            }

            const ratio = {
                width: gameImage.width / imageRef.current.width,
                height: gameImage.height / imageRef.current.height
            };

            setRatio(ratio);
        };

        gameImage.src = gameConfig.image;
    }, [imageRef.current]);

    return {
        selectionWindowX,
        selectionWindowY,
        selectionColor,
        handlePerformFindAttempt,
        handleTimerComplete
    };
}
