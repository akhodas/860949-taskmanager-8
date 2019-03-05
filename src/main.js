import createFilter from "./create-filter";
import drawField from './draw-field';
import Card from './Card';

import ConfigCard from './ConfigCard';

const configurationFilters = [
  {
    id: `all`,
    count: 9,
    checked: true
  },
  {
    id: `overdue`,
    count: 8
  },
  {
    id: `today`,
    count: 7
  },
  {
    id: `favorites`,
    count: 0
  },
  {
    id: `repeating`,
    count: 5
  },
  {
    id: `tags`,
    count: 4
  },
  {
    id: `archive`,
    count: 3
  }
];

const generateListConfigCards = (count) => {
  const listConfigCards = [];
  for (let i = 0; i < count; i++) {
    listConfigCards.push(new ConfigCard());
  }
  return listConfigCards;
};

const drawFilters = (configFilters) => {
  const createFiltersList = (config = []) => config.map(createFilter).join(``);

  drawField(`main__filter`, createFiltersList(configFilters));
};

const drawCards = (configCards) => {
  const createCardsList = (config = []) => config.map((carrent) => new Card(carrent).prepareForDrow()).join(``);

  drawField(`board__tasks`, createCardsList(configCards));
};

drawFilters(configurationFilters);
drawCards(generateListConfigCards(7));

const elementsFilter = document.getElementsByClassName(`filter__label`);

for (let i = 0; i < elementsFilter.length; i++) {
  elementsFilter[i].addEventListener(`click`, () => {
    drawCards(generateListConfigCards(Math.round(Math.random() * 7)));
  });
}
