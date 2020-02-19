
import anteater from '../../asset/animals/anteater.svg';
import bear from '../../asset/animals/bear.svg';
import beaver from '../../asset/animals/beaver.svg';
import boar from '../../asset/animals/boar.svg';
import buffalo from '../../asset/animals/buffalo.svg';
import cat from '../../asset/animals/cat.svg';
import chicken from '../../asset/animals/chicken.svg';
import cow from '../../asset/animals/cow.svg';
import crow from '../../asset/animals/crow.svg';
import fox from '../../asset/animals/fox.svg';

const images = [
    anteater,
    bear,
    beaver,
    boar,
    buffalo,
    cat,
    chicken,
    cow,
    crow,
    fox
];

function getRandomImage() {
    var img = images[Math.floor(Math.random() * images.length)]
    return img
}
export default getRandomImage;