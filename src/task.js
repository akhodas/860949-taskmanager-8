import AbstractComponentRender from './abstract-component-render';
import Color from './constants/color-card';

export default class Task extends AbstractComponentRender {
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
    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  get template() {
    return `
    <article class="card     
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
                  ${this._createFieldDeadline(this._dueDate)}
                  ${this._createFieldRepeatDays(this._repeatingDays)}
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

  set onEdit(fn) {
    this._onEdit = fn;
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
          ${this._checkingMapOnTrueValue(this._repeatingDays) ? `
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

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  createListeners() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick);
  }

  removeListeners() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick);
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

}
