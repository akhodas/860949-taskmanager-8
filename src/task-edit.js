import AbstractComponentRender from './abstract-component-render';
import Color from './constants/color-card';

export default class TaskEdit extends AbstractComponentRender {
  constructor(options) {
    super();
    this._id = options.id;
    this._title = options.title;
    this._tags = options.tags;
    this._picture = options.picture;
    this._dueDate = options.dueDate;
    this._repeatingDays = options.repeatingDays;
    this._color = options.color;
    this._isFavorite = options.isFavorite;
    this._isDone = options.isDone;
    this._state = {};
    this._state.isDate = options.dueDate ? true : false;
    this._state.isRepeated = this._checkingMapOnTrueValue(options.repeatingDays);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
    this._onSave = null;
    this._onSaveButtonClick = this._onSaveButtonClick.bind(this);
    this._onDelete = null;
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  get template() {
    return `
      <article class="card card--edit
      ${this._state.isRepeated ? `card--repeat` : ``}
      ${(this._state.isDate && +this._dueDate - Date.now() < 7 * 24 * 60 * 60 * 1000) ? `card--deadline` : ``}
      card--${this._color}
          ">
          <form class="card__form" method="get">
            <div class="card__inner">
              <div class="card__control">
                <button type="button" class="card__btn card__btn--edit">
                  edit
                </button>
                <button type="button" class="card__btn card__btn--archive">
                  archive
                </button>
                <button
                  type="button"
                  class="card__btn card__btn--favorites card__btn--disabled"
                >
                  favorites
                </button>
              </div>
  
              <div class="card__color-bar">
                <svg class="card__color-bar-wave" width="100%" height="10">
                  <use xlink:href="#wave"></use>
                </svg>
              </div>
  
              <div class="card__textarea-wrap">
                <label>
                  <textarea
                    class="card__text"
                    placeholder="Start typing your text here..."
                    name="text"
                  >${this._title}
                  </textarea>
                </label>
              </div>
  
              <div class="card__settings">
                <div class="card__details">
                  <div class="card__dates">
                    ${this._createFieldDeadline()}
                    ${this._createFieldRepeatDays()}
                  </div>
  
                  <div class="card__hashtag">
                    <div class="card__hashtag-list">
                      ${this._createListCardHashtag(this._tags)}
                    </div>
  
                    <label>
                      <input
                        type="text"
                        class="card__hashtag-input"
                        name="hashtag-input"
                        placeholder="Type new hashtag here"
                      />
                    </label>
                  </div>
                </div>
  
                <label class="card__img-wrap">
                  <input
                    type="file"
                    class="card__img-input visually-hidden"
                    name="img"
                  />
                  <img
                    src="${this._picture}"
                    alt="task picture"
                    class="card__img"
                  />
                </label>
  
                <div class="card__colors-inner">
                  <h3 class="card__colors-title">Color</h3>
                  <div class="card__colors-wrap">
                    ${this._createListCardColorWrap(this._color)}
                  </div>
                </div>
              </div>
  
              <div class="card__status-btns">
                <button class="card__save" type="submit">save</button>
                <button class="card__delete" type="button">delete</button>
              </div>
            </div>
          </form>
        </article>
      `;
  }

  set onSave(fn) {
    this._onSave = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  _checkingMapOnTrueValue(chekingMap) {
    for (const value of chekingMap.values()) {
      if (value) {
        return true;
      }
    }

    return false;
  }

  _createListCardHashtag() {
    const createCardHashtag = (hashtag) => {
      return `
          <span class="card__hashtag-inner">
            <input
              type="hidden"
              name="hashtag"
              value="repeat"
              class="card__hashtag-hidden-input"
            />
            <button type="button" class="card__hashtag-name">
              #${hashtag}
            </button>
            <button type="button" class="card__hashtag-delete">
              delete
            </button>
          </span>
        `;
    };

    const tagsList = [];
    for (const tag of this._tags) {
      tagsList.push(createCardHashtag(tag));
    }
    return tagsList.join(``);
  }

  _createListCardColorWrap() {
    const cardColor = [];
    for (const key in Color) {
      if (Color.hasOwnProperty(key)) {
        cardColor.push(`
        <input
          type="radio"
          id="color-${Color[key]}-${this._id}"
          class="card__color-input card__color-input--${Color[key]} visually-hidden"
          name="color"
          value="${Color[key]}"
          ${(this._color === Color[key]) ? `checked` : ``}
        />
        <label
          for="color-${Color[key]}-${this._id}"
          class="card__color card__color--${Color[key]}"
          >${Color[key]}</label
        >`);
      }
    }

    return cardColor.join(``);
  }

  _createFieldRepeatDays() {
    const createRepeatDay = (day) => {
      return `
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-${day[0]}-${this._id}"
                        name="repeat"
                        value="${day[0]}"
                        ${day[1] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-${day[0]}-${this._id}">${day[0]}
                      </label>
                  `;
    };

    const createRepeatDays = (mapRepeatingDays) => {
      const result = [];

      for (const day of mapRepeatingDays) {
        result.push(createRepeatDay(day));
      }

      return result.join(``);
    };

    return `
        <button class="card__repeat-toggle" type="button">
          repeat:<span class="card__repeat-status">
            ${this._state.isRepeated ? `
            YES</span>
        </button>
        <fieldset class="card__repeat-days">
          <div class="card__repeat-days-inner">
            ${createRepeatDays(this._repeatingDays)}                          
          </div>
        </fieldset>` : `
            NO</span>
        </button>`}
      `;
  }

  _createFieldDeadline() {
    const date = new Date(this._dueDate);
    const fieldDate = `
              <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">
                  ${this._state.isDate ? `YES` : `NO`}
                  </span>
              </button>
  
              ${this._state.isDate ? `
                          <fieldset class="card__date-deadline">
                              <label class="card__input-deadline-wrap">
                              <input
                                  class="card__date"
                                  type="text"
                                  placeholder="23 September"
                                  name="date"
                                  value="${date.toDateString()}"
                              />
                              </label>
                              <label class="card__input-deadline-wrap">
                              <input
                                  class="card__time"
                                  type="text"
                                  placeholder="11:15 PM"
                                  name="time"
                                  value="${date.toTimeString().slice(0, 5)}"
                              />
                              </label>
                          </fieldset>
                      ` : ``}`;
    return fieldDate;
  }

  _onSaveButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);

    if (typeof this._onSave === `function`) {
      this._onSave(newData);
    }
    this.update(newData);
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onDelete === `function`) {
      this._onDelete();
    }
  }

  createListeners() {
    this._element.querySelector(`.card__save`)
      .addEventListener(`click`, this._onSaveButtonClick);
    this._element.querySelector(`.card__delete`)
      .addEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
        .addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
        .addEventListener(`click`, this._onChangeRepeated);
  }

  removeListeners() {
    this._element.querySelector(`.card__save`)
      .removeEventListener(`submit`, this._onSaveButtonClick);
    this._element.querySelector(`.card__delete`)
      .removeEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
        .removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
        .removeEventListener(`click`, this._onChangeRepeated);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._dueDate = data.dueDate;
    this._state.isDate = data.isDate;
    this._repeatingDays = data.repeatingDays;
    this._state.isRepeated = this._checkingMapOnTrueValue(this._repeatingDays);
    this._color = data.color;
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.removeListeners();
    this._partialUpdate();
    this.createListeners();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.removeListeners();
    this._partialUpdate();
    this.createListeners();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(),
      isDate: false,
      repeatingDays: new Map([
        [`mo`, false],
        [`tu`, false],
        [`we`, false],
        [`th`, false],
        [`fr`, false],
        [`sa`, false],
        [`su`, false],
      ]),
    };

    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => {
        target.title = value;
      },
      color: (value) => {
        target.color = value;
      },
      repeat: (value) => {
        target.repeatingDays.set(value, true);
      },
      date: (value) => {
        target.dueDate = new Date(value);
        target.isDate = true;
      },
      time: (value) => {
        target.dueDate = new Date(target.dueDate.getTime() +
          (value.slice(0, 2) * 60 + +value.slice(3)) * 60 * 1000);
      },
    };
  }

}
