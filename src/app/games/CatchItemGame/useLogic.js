import { useMediaQuery } from 'react-responsive';
import BgImage from '../../assets/images/catchItem/bg.jpg';
import CucumberImage from '../../assets/images/catchItem/cucumber.png';
import TomatoImage from '../../assets/images/catchItem/tomato.png';
import PotatoImage from '../../assets/images/catchItem/potato.png';
import CabbageImage from '../../assets/images/catchItem/cabbage.png';
import ShoppingCartImage from '../../assets/images/catchItem/cart.png';

// TODO: в игре с поиском ужен таймер, если время кончилось - ты проиграл

export default function useLogic({ canvasRef, cart, setScores }) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    if (canvasRef) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas?.getContext('2d');
        const products = [];
        let gameTimer = 0;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const bgImage = new Image();
        bgImage.src = BgImage;

        const shoppingCartImage = new Image();
        shoppingCartImage.src = ShoppingCartImage;

        const cucumberImage = new Image();
        cucumberImage.src = CucumberImage;

        const tomatoImage = new Image();
        tomatoImage.src = TomatoImage;

        const potatoImage = new Image();
        potatoImage.src = PotatoImage;

        const cabbageImage = new Image();
        cabbageImage.src = CabbageImage;

        const productsOptions = [cucumberImage, tomatoImage, potatoImage, cabbageImage];

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
            ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(shoppingCartImage, cart.x, cart.y, 150, 150);

            products.forEach((product) => {
                ctx.save();
                ctx.translate(product.x + 30, product.y + 30);
                ctx.rotate(product.angle);
                ctx.drawImage(product.img, -30, -30, 60, 60);
                ctx.restore();
            });
        };

        const game = () => {
            update();
            render();
            requestAnimationFrame(game);
        };

        const handleCartPositionChange = (e) => {
            if (e.nativeEvent.offsetX + 150 <= canvas.width) {
                cart.x = e.nativeEvent.offsetX;
            }
        };

        const handleMouseMove = (e) => {
            if (isTabletOrMobile) {
                return;
            }

            handleCartPositionChange(e);
        };

        const handleTouch = (e) => {
            if (!isTabletOrMobile) {
                return;
            }

            handleCartPositionChange(e);
        };

        return {
            handleMouseMove,
            handleTouch,
            game
        };
    }

    return {};
}
