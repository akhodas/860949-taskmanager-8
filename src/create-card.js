function createCard(config) {

  function createNewCard(configCard) {
    const result = `
        <article class="card 
        ${configCard.edit ? `card--edit` : ``}
        ${checkingMapOnTrueValue(configCard.repeatingDays) ? `card--repeat` : ``}
        ${configCard.deadline ? `card--deadline` : ``}
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
                    >
                        ${configCard.text}
                    </textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      ${createFieldDeadline(configCard.deadline, configCard.deadlinePoint)}
                      ${createFieldRepeatDays(configCard.repeatingDays)}
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${createFieldCardHashtagList(configCard.hashtags)}
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
                      ${createFieldCardColorWrap(configCard.color)}
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

    return result;
  }

  function createFieldDeadline(deadline, deadlinePoint) {
    const feildDeadline =
            `
            <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">
                ${deadline ? `YES` : `NO`}
                </span>
            </button>
        
            ${deadline ? `
                        <fieldset class="card__date-deadline">
                            <label class="card__input-deadline-wrap">
                            <input
                                class="card__date"
                                type="text"
                                placeholder="23 September"
                                name="date"
                                value="${deadlinePoint.date}"
                            />
                            </label>
                            <label class="card__input-deadline-wrap">
                            <input
                                class="card__time"
                                type="text"
                                placeholder="11:15 PM"
                                name="time"
                                value="${deadlinePoint.time}"
                            />
                            </label>
                        </fieldset>
                    ` : ``}`;

    return feildDeadline;
  }

  function createFieldRepeatDays(repeatingDays) {
    const feildRepeatDays = `
      <button class="card__repeat-toggle" type="button">
        repeat:<span class="card__repeat-status">
          ${checkingMapOnTrueValue(repeatingDays) ? `
          YES</span>
      </button>
      <fieldset class="card__repeat-days">
        <div class="card__repeat-days-inner">
          ${createRepeatDays()}                          
        </div>
      </fieldset>` : `
          NO</span>
      </button>`}
    `;

    function createRepeatDays() {
      const result = [];

      for (const day of repeatingDays) {
        result.push(createRepeatDay(day));
      }

      return result.join(``);
    }

    function createRepeatDay(day) {
      const result = `
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

      return result;
    }

    return feildRepeatDays;
  }

  function createFieldCardColorWrap(configColor) {
    function createCardsColorWrap() {
      const cardColor = [`black`, `yellow`, `green`, `blue`, `pink`];
      return cardColor.map(createCardColorWrap).join(``);
    }

    function createCardColorWrap(color) {
      const result = `
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
      return result;
    }

    return createCardsColorWrap();
  }

  function createFieldCardHashtagList(hashtags) {

    function createCardHashtag(hashtag) {
      const result = `
        <span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value="repeat"
            class="card__hashtag-hidden-input"
          />
          <button type="button" class="card__hashtag-name">
            ${hashtag}
          </button>
          <button type="button" class="card__hashtag-delete">
            delete
          </button>
        </span>
      `;
      return result;
    }

    return hashtags.map(createCardHashtag).join(``);
  }

  function checkingMapOnTrueValue(chekingMap) {
    for (const value of chekingMap.values()) {
      if (value) {
        return true;
      }
    }

    return false;
  }

  return createNewCard(config);
}

export default createCard;
