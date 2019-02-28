function generateConfigCards(count = 0) {
  const colorCard = [`black`, `yellow`, `green`, `blue`, `pink`];
  const cards = [];

  for (let i = 0; i < count; i++) {
    const card = {};

    card.title = [
      `Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`
    ][Math.floor(Math.random() * 3)];
    card.edit = (Math.random() - 0.8) > 0 ? true : false;
    card.deadline = (Math.random() - 0.8) > 0 ? true : false;
    card.deadlinePoint = {
      date: `21 April 2019`,
      time: `08:30 PM`
    };
    card.repeatingDays = new Map([
      [`mo`, false],
      [`tu`, (Math.random() - 0.9) > 0 ? true : false],
      [`we`, (Math.random() - 0.9) > 0 ? true : false],
      [`th`, (Math.random() - 0.9) > 0 ? true : false],
      [`fr`, (Math.random() - 0.9) > 0 ? true : false],
      [`sa`, (Math.random() - 0.9) > 0 ? true : false],
      [`su`, (Math.random() - 0.9) > 0 ? true : false],
    ]);
    card.hashtags = [`cinema`, `Minsk`, `repeat`];
    card.color = colorCard[Math.round(Math.random() * 5)];
    card.picture = `http://picsum.photos/100/100?r=${Math.random()}`;

    cards.push(card);
  }

  return cards;
}

export default generateConfigCards;
