import React from 'react';
import { RootStore } from '../../stores/RootStore';

export default function useLogic({ imageRef, gameConfig, setResult, day }) {
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

    const performFindAttempt = async ({ x, y }) => {
        const isFindSuccess = confirmFind(x, y);

        if (isFindSuccess) {
            try {
                const data = await RootStore.dayComplete(day);

                setResult({
                    status: true,
                    promoCode: data.promocode || false
                });
            } catch {
                setResult({
                    status: true,
                    promoCode: false
                });
            }
        }
    };

    const handlePerformFindAttempt = (e) => {
        const rect = imageRef.current.getBoundingClientRect();
        const mousePosition = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        performFindAttempt({ x: mousePosition.x, y: mousePosition.y });
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
            imageRef.current.width = gameImage.width;
            imageRef.current.height = gameImage.height;

            const ratio = {
                width: gameImage.width / imageRef.current.width,
                height: gameImage.height / imageRef.current.height
            };

            setRatio(ratio);
        };

        gameImage.src = gameConfig.image;
    }, [imageRef.current]);

    return {
        handlePerformFindAttempt,
        handleTimerComplete
    };
}
