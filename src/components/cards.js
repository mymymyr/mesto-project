const sochiImage = new URL('../images/place-sochi.jpg', import.meta.url);
const stPetersburgImage = new URL('../images/place-st-petersburg.jpg', import.meta.url);
const krasnogorskImage = new URL('../images/place-krasnogorsk.jpg', import.meta.url);
const chelyabinskImage = new URL('../images/place-chelyabinsk.jpg', import.meta.url);
const noginskImage = new URL('../images/place-noginsk.jpg', import.meta.url);
const moscowImage = new URL('../images/place-moscow.jpg', import.meta.url);

export const initialCards = [
  {
    name: 'Сочи',
    link: sochiImage
  },
  {
    name: 'Санкт-Петербург',
    link: stPetersburgImage
  },
  {
    name: 'Красногорск',
    link: krasnogorskImage
  },
  {
    name: 'Челябинск',
    link: chelyabinskImage
  },
  {
    name: 'Ногинск',
    link: noginskImage
  },
  {
    name: 'Москва',
    link: moscowImage
  }
];
