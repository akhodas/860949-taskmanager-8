import Color from './constants/color-card';

export default class ConfigCard {
  constructor() {
    this.id = Math.floor(Math.random() * 10000) + 1;

    this.title = [
      `Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`
    ][Math.floor(Math.random() * 3)];

    this.dueDate = (Math.random() - 0.7) > 0 ?
      Date.now()
        + Math.floor(Math.random() * 24 * 60) * 60 * 1000
        + Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000
      : undefined;

    this.repeatingDays = new Map([
      [`mo`, false],
      [`tu`, (Math.random() - 0.9) > 0 ? true : false],
      [`we`, (Math.random() - 0.9) > 0 ? true : false],
      [`th`, (Math.random() - 0.9) > 0 ? true : false],
      [`fr`, (Math.random() - 0.9) > 0 ? true : false],
      [`sa`, (Math.random() - 0.9) > 0 ? true : false],
      [`su`, (Math.random() - 0.9) > 0 ? true : false],
    ]);

    this.tags = new Set(this._createTags());

    this.color = Color[Object.keys(Color)[Math.floor(Math.random() * 5)]];

    this.picture = `http://picsum.photos/100/100?r=${Math.random()}`;

    this.isArchive = (Math.random() - 0.7) > 0 ? true : false;

    this.isFavorite = (Math.random() - 0.7) > 0 ? true : false;

    this.isDone = (Math.random() - 0.7) > 0 ? true : false;

  }

  _createTags() {
    let countTag = 0;
    let listTags = [];
    [`homework`, `theory`, `practice`, `intensive`, `keks`, `Minsk`, `cinema`].forEach((item) => {
      if ((Math.random() - 0.7) > 0 && countTag < 3) {
        listTags.push(item);
        countTag++;
      }
    });
    return listTags;
  }


}
