import createFilter from "./create-filter";
import createCard from './create-card';

import generateConfigCards from './generate-config-card';

function drawFilters() {
  const configFilters = [
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

  const mainFilter = document.getElementsByClassName(`main__filter`)[0];

  if (mainFilter) {
    const filters = createFiltersList(configFilters);

    mainFilter.innerHTML = filters;
  }

  function createFiltersList(config = []) {
    return config.map(createFilter).join(``);
  }
}

function drawCards(configCards) {
  const boardTasks = document.getElementsByClassName(`board__tasks`)[0];

  if (boardTasks) {
    const cards = createCardsList(configCards);

    boardTasks.innerHTML = cards;
  }

  function createCardsList(config = []) {
    return config.map(createCard).join(``);
  }
}

drawFilters();
drawCards(generateConfigCards(7));

const elementsFilter = document.getElementsByClassName(`filter__label`);

for (let i = 0; i < elementsFilter.length; i++) {
  elementsFilter[i].addEventListener(`click`, () => {
    drawCards(generateConfigCards(Math.round(Math.random() * 7)));
  });
}
