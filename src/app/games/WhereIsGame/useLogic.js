import React from 'react';

export default function useLogic({ canvasRef, image, gameConfig, setResult, isDesktop }) {
    const [selectionWindowX, setSelectionWindowX] = React.useState('');
    const [selectionWindowY, setSelectionWindowY] = React.useState('');
    const [selectionColor, setSelectionColor] = React.useState('');

    if (canvasRef) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas?.getContext('2d');

        const gameImage = new Image();
        gameImage.src = image;
        let ratio = {};

        if (isDesktop) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            ratio = {
                width: gameImage.width / canvas.width,
                height: gameImage.height / canvas.height
            };
        } else {
            canvas.width = gameImage.width;
            canvas.height = gameImage.height;

            ratio = {
                width: 1,
                height: 1
            };
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(gameImage, 0, 0, canvas.width, canvas.height);
        };

        const game = () => {
            render();
            requestAnimationFrame(game);
        };

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
            const rect = canvas.getBoundingClientRect();
            const mousePosition = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
            generateSelectionWindow({ x: mousePosition.x, y: mousePosition.y });
        };

        return {
            selectionWindowX,
            selectionWindowY,
            selectionColor,
            handlePerformFindAttempt,
            game
        };
    }

    return {};
}
