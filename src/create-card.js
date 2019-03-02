const createCard = (config) => {

  const checkingMapOnTrueValue = (chekingMap) => {
    for (const value of chekingMap.values()) {
      if (value) {
        return true;
      }
    }

    return false;
  };

  const createListCardHashtag = (hashtags) => {
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
    for (const tag of hashtags) {
      tagsList.push(createCardHashtag(tag));
    }
    return tagsList.join(``);
  };

  const createListCardColorWrap = (configColor) => {
    const cardColor = [`black`, `yellow`, `green`, `blue`, `pink`];
    const createCardColorWrap = (color) => {
      return `
        <input
          type="radio"
          id="color-${color}-6"
          class="card__color-input card__color-input--${color} visually-hidden"
          name="color"
          value="${color}"
          ${(configColor === color) ? `checked` : ``}
        />
        <label
          for="color-${color}-6"
          class="card__color card__color--${color}"
          >${color}</label
        >
      `;
    };

    return cardColor.map((current) => createCardColorWrap(current, configColor)).join(``);
  };

  const createFieldRepeatDays = (repeatingDays) => {
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
          ${checkingMapOnTrueValue(repeatingDays) ? `
          YES</span>
      </button>
      <fieldset class="card__repeat-days">
        <div class="card__repeat-days-inner">
          ${createRepeatDays(repeatingDays)}                          
        </div>
      </fieldset>` : `
          NO</span>
      </button>`}
    `;
  };

  const createFieldDeadline = (dueDate) => {
    const date = new Date(dueDate);
    const fieldDate = `
            <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">
                ${dueDate ? `YES` : `NO`}
                </span>
            </button>

            ${dueDate ? `
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
  };

  return ((configCard) => {
    return `
        <article class="card 
        ${configCard.edit ? `card--edit` : ``}
        ${checkingMapOnTrueValue(configCard.repeatingDays) ? `card--repeat` : ``}
        ${(+configCard.dueDate - Date.now() < 7 * 24 * 60 * 60 * 1000) ? `card--deadline` : ``}
        card--${configCard.color}
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
                    >${configCard.title}
                    </textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      ${createFieldDeadline(configCard.dueDate)}
                      ${createFieldRepeatDays(configCard.repeatingDays)}
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${createListCardHashtag(configCard.tags)}
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
                      src="${configCard.picture}"
                      alt="task picture"
                      class="card__img"
                    />
                  </label>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                      ${createListCardColorWrap(configCard.color)}
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
  })(config);
};

export default createCard;
