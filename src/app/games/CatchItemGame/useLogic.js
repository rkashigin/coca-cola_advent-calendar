import { useMediaQuery } from 'react-responsive';
import RedHat from '../../assets/images/Games/RedHat.png';
import GreenHat from '../../assets/images/Games/GreenHat.png';
import RedGloves from '../../assets/images/Games/RedGloves.png';
import GreenGloves from '../../assets/images/Games/GreenGloves.png';
import Penguin from '../../assets/images/Games/Penguin.png';
import ShoppingCartImage from '../../assets/images/catchItem/cart.png';

export default function useLogic({ canvasRef, cart, setScores }) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    if (canvasRef) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas?.getContext('2d');
        const products = [];
        const deviceMultiplier = isTabletOrMobile ? 0.6 : 1;
        let gameTimer = 0;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        cart.y = canvas.height - 150 * deviceMultiplier;

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
                    x: Math.random() * canvas.width,
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

                if (products[i].x >= canvas.width - 60 || products[i].x < 0) {
                    products[i].dx = -products[i].dx;
                }

                if (products[i].y >= canvas.height) {
                    products.splice(i, 1);
                }

                if (
                    Math.abs(products[i].x + 30 - cart.x - 75) < 60 &&
                    Math.abs(products[i].y - cart.y) < 30
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
            ctx.drawImage(
                shoppingCartImage,
                cart.x,
                cart.y,
                150 * deviceMultiplier,
                150 * deviceMultiplier
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

            if (e.nativeEvent.offsetX + 150 * deviceMultiplier <= canvas.width) {
                cart.x = e.nativeEvent.offsetX;
            }
        };

        const handleTouch = (e) => {
            if (!isTabletOrMobile) {
                return;
            }

            if (e.changedTouches[0].clientX + 150 * deviceMultiplier <= canvas.width) {
                cart.x = e.changedTouches[0].clientX;
            } else {
                cart.x = canvas.width - 150 * deviceMultiplier;
            }
        };

        return {
            handleMouseMove,
            handleTouch,
            game
        };
    }

    return {};
}
