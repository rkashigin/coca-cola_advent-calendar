import RedHat from '../../assets/images/threeInARow/RedHat.svg';
import GreenHat from '../../assets/images/threeInARow/GreenHat.svg';
import RedGloves from '../../assets/images/threeInARow/RedGloves.svg';
import GreenGloves from '../../assets/images/threeInARow/GreenGloves.svg';
import Penguin from '../../assets/images/threeInARow/Penguin.svg';

export default [RedHat, GreenHat, RedGloves, GreenGloves, Penguin].map((img) => {
    const image = new Image();
    image.src = img;

    return image;
});
