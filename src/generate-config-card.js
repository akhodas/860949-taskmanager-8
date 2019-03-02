const generateConfigCards = (count = 0) => {
  const cards = [];
  const hashtags = [`homework`, `theory`, `practice`, `intensive`, `keks`, `Minsk`, `cinema`];

  for (let i = 0; i < count; i++) {
    const card = {};

    card.title = [
      `Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`
    ][Math.floor(Math.random() * 3)];

    card.edit = (Math.random() - 0.8) > 0 ? true : false;

    card.dueDate = (Math.random() - 0.7) > 0 ?
      Date.now()
        + Math.floor(Math.random() * 24 * 60) * 60 * 1000
        + Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000
      : undefined;

    card.repeatingDays = new Map([
      [`mo`, false],
      [`tu`, (Math.random() - 0.9) > 0 ? true : false],
      [`we`, (Math.random() - 0.9) > 0 ? true : false],
      [`th`, (Math.random() - 0.9) > 0 ? true : false],
      [`fr`, (Math.random() - 0.9) > 0 ? true : false],
      [`sa`, (Math.random() - 0.9) > 0 ? true : false],
      [`su`, (Math.random() - 0.9) > 0 ? true : false],
    ]);

    card.tags = new Set();
    let countTag = 0;
    hashtags.forEach((item) => {
      if ((Math.random() - 0.7) > 0 && countTag < 3) {
        card.tags.add(item);
        countTag++;
      }
    });

    card.color = `black, yellow, blue, green, pink`.split(`, `)[Math.round(Math.random() * 5)];

    card.picture = `http://picsum.photos/100/100?r=${Math.random()}`;

    card.isFavorite = (Math.random() - 0.7) > 0 ? true : false;

    card.isDone = (Math.random() - 0.7) > 0 ? true : false;

    cards.push(card);
  }

  return cards;
};

export default generateConfigCards;
