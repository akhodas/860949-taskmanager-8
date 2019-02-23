import createFilter from "./create-filter";
import createCard from './create-card';

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

function generateConfigCards(count = 0) {
  const colorCard = [`black`, `yellow`, `green`, `blue`, `pink`];
  const cards = [];

  for (let i = 0; i < count; i++) {
    const card = {};

    card.edit = (Math.random() - 0.8) > 0 ? true : false;
    card.deadline = (Math.random() - 0.8) > 0 ? true : false;
    card.deadlinePoint = {
      date: `21 April 2019`,
      time: `08:30 PM`
    };
    card.repeat = (Math.random() - 0.5) > 0 ? true : false;
    card.repeatDays = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
    card.hashtags = [`#cinema`, `#Minsk`, `#repeat`];
    card.color = colorCard[Math.round(Math.random() * 5)];
    card.text = `task #${i + 1}`;

    cards.push(card);
  }

  return cards;
}

drawFilters();
drawCards(generateConfigCards(7));

const elementsFilter = document.getElementsByClassName(`filter__label`);

for (let i = 0; i < elementsFilter.length; i++) {
  elementsFilter[i].addEventListener(`click`, () => {
    drawCards(generateConfigCards(Math.round(Math.random() * 7)));
  });
}
