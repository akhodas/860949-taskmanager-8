import createElement from './create-element';

export default class Task {
  constructor(options) {
    this._title = options.title;
    this._tags = options.tags;
    this._picture = options.picture;
    this._dueDate = options.dueDate;
    this._repeatingDays = options.repeatingDays;
    this._color = options.color;
    this._isFavorite = options.isFavorite;
    this._isDone = options.isDone;
    this._state = {};
    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._element = null;
  }

  get template() {
    return `
      <article class="card card--edit
      ${this._checkingMapOnTrueValue(this._repeatingDays) ? `card--repeat` : ``}
      ${(+this._dueDate - Date.now() < 7 * 24 * 60 * 60 * 1000) ? `card--deadline` : ``}
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

  get element() {
    return this._element;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
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
    const cardColor = [`black`, `yellow`, `green`, `blue`, `pink`];
    const createCardColorWrap = (color) => {
      return `
          <input
            type="radio"
            id="color-${color}-6"
            class="card__color-input card__color-input--${color} visually-hidden"
            name="color"
            value="${color}"
            ${(this._color === color) ? `checked` : ``}
          />
          <label
            for="color-${color}-6"
            class="card__color card__color--${color}"
            >${color}</label
          >
        `;
    };

    return cardColor.map((current) => createCardColorWrap(current)).join(``);
  }

  _createFieldRepeatDays() {
    const createRepeatDay = (day) => {
      return `
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-${day[0]}-6"
                        name="repeat"
                        value="${day[0]}"
                        ${day[1] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-${day[0]}-6">${day[0]}
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
                  ${this._dueDate ? `YES` : `NO`}
                  </span>
              </button>
  
              ${this._dueDate ? `
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

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  bind() {
    this._element.querySelector(`.card__form`)
          .addEventListener(`submit`, this._onSubmitButtonClick);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unbind() {
    this._element.querySelector(`.card__form`)
    .removeEventListener(`submit`, this._onSubmitButtonClick);
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

}
