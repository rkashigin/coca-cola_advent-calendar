import React from 'react';
import { useMediaQuery } from 'react-responsive';

import RedHat from '../../assets/images/Games/RedHat.png';
import GreenHat from '../../assets/images/Games/GreenHat.png';
import RedGloves from '../../assets/images/Games/RedGloves.png';
import GreenGloves from '../../assets/images/Games/GreenGloves.png';
import Penguin from '../../assets/images/Games/Penguin.png';
import ShoppingCartImage from '../../assets/images/catchItem/cart.svg';
import { RootStore } from '../../stores/RootStore';

export default function useLogic({ canvasRef, cart, setScores, setResult, day }) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const checkScores = async (scores) => {
        if (scores === 300) {
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

    const handleTimerComplete = React.useCallback(() => setResult({ status: false }), []);

    if (canvasRef) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas?.getContext('2d');
        const products = [];
        const deviceMultiplier = isTabletOrMobile ? 0.6 : 1;
        const scale = window.devicePixelRatio;
        let gameTimer = 0;

        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        canvas.width = Math.floor(window.innerWidth * scale);
        canvas.height = Math.floor(window.innerHeight * scale);
        ctx.scale(scale, scale);

        if (!cart.x && !cart.y && !cart.prevX && !cart.prevY) {
            cart.x = canvas.width / (2 * scale);
            cart.prevX = canvas.width / (2 * scale);
            cart.y = (canvas.height - 170 * scale * deviceMultiplier) / scale;
            cart.prevY = (canvas.height - 170 * scale * deviceMultiplier) / scale;
        }

        const shoppingCartImage = new Image();
        shoppingCartImage.src = ShoppingCartImage;

        const redHatImage = new Image();
        redHatImage.src = RedHat;

        const greenHatImage = new Image();
        greenHatImage.src = GreenHat;

        const redGlovesImage = new Image();
        redGlovesImage.src = RedGloves;

        const greenGlovesImage = new Image();
        greenGlovesImage.src = GreenGloves;

        const penguinImage = new Image();
        penguinImage.src = Penguin;

        const productsOptions = [
            redHatImage,
            greenHatImage,
            redGlovesImage,
            greenGlovesImage,
            penguinImage
        ];

        const update = () => {
            gameTimer += 1;

            if (gameTimer % 30 === 0) {
                const randomProduct = Math.floor(Math.random() * 4);

                products.push({
                    img: productsOptions[randomProduct],
                    x: Math.random() * (canvas.width - 60 * scale * deviceMultiplier),
                    y: -100,
                    dx: Math.random() * 2 - 1,
                    dy: Math.random() * 2 + 2,
                    angle: 0,
                    dangle: 0.05,
                    del: 0
                });
            }

            for (let i = 0; i < products.length; i += 1) {
                products[i].x += products[i].dx;
                products[i].y += products[i].dy;
                products[i].angle += products[i].dangle;

                if (products[i].x >= (canvas.width - 60 * scale) / scale || products[i].x < 0) {
                    products[i].dx = -products[i].dx;
                }

                if (products[i].y >= canvas.height / scale) {
                    products.splice(i, 1);
                }

                if (
                    Math.abs(products[i].x + 30 - cart.x - 80) * scale < 65 * scale &&
                    Math.abs(products[i].y - cart.y) * scale < 30 * scale
                ) {
                    products.splice(i, 1);
                    setScores((prevScores) => prevScores + 10);
                }
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#E5E5E5';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // if (isTabletOrMobile) {
            //     ctx.drawImage(
            //         shoppingCartImage,
            //         cart.prevX,
            //         cart.y,
            //         160 * deviceMultiplier,
            //         160 * deviceMultiplier
            //     );
            // } else {
            //
            // }
            ctx.drawImage(
                shoppingCartImage,
                cart.x,
                cart.y,
                160 * deviceMultiplier,
                160 * deviceMultiplier
            );

            products.forEach((product) => {
                ctx.save();
                ctx.translate(product.x + 30 * deviceMultiplier, product.y + 30 * deviceMultiplier);
                ctx.rotate(product.angle);
                ctx.drawImage(
                    product.img,
                    -30 * deviceMultiplier,
                    -30 * deviceMultiplier,
                    60 * deviceMultiplier,
                    60 * deviceMultiplier
                );
                ctx.restore();
            });
        };

        const game = () => {
            update();
            render();
            requestAnimationFrame(game);
        };

        const handleMouseMove = (e) => {
            if (isTabletOrMobile) {
                return;
            }

            if ((e.nativeEvent.offsetX + 140 * deviceMultiplier) * scale <= canvas.width) {
                cart.x = e.nativeEvent.offsetX;
            }
        };

        const handleTouch = (e) => {
            if (!isTabletOrMobile) {
                return;
            }

            if ((e.changedTouches[0].clientX + 140 * deviceMultiplier) * scale <= canvas.width) {
                cart.x = e.changedTouches[0].clientX;
            } else {
                cart.x = (canvas.width - 160 * deviceMultiplier * scale) / scale;
            }
        };

        return {
            handleMouseMove,
            handleTouch,
            game,
            checkScores,
            handleTimerComplete
        };
    }

    return { checkScores, handleTimerComplete };
}
