import createFilter from "./create-filter";
import createCard from './create-card';
import drawField from './draw-field';

import generateConfigCards from './generate-config-card';

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

const drawFilters = (configFilters) => {
  const createFiltersList = (config = []) => config.map(createFilter).join(``);

  drawField(`main__filter`, createFiltersList(configFilters));
};

const drawCards = (configCards) => {
  const createCardsList = (config = []) => config.map(createCard).join(``);

  drawField(`board__tasks`, createCardsList(configCards));
};

drawFilters(configurationFilters);
drawCards(generateConfigCards(7));

const elementsFilter = document.getElementsByClassName(`filter__label`);

for (let i = 0; i < elementsFilter.length; i++) {
  elementsFilter[i].addEventListener(`click`, () => {
    drawCards(generateConfigCards(Math.round(Math.random() * 7)));
  });
}
