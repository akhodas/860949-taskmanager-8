export default (config) => {

  function createNewCard(configCard) {
    const result = `
        <article class="card 
        ${configCard.edit ? `card--edit` : ``}
        ${configCard.repeat ? `card--repeat` : ``}
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
                      <button class="card__date-deadline-toggle" type="button">
                        date: 
                        <span class="card__date-status">
                            ${configCard.deadline ? `YES` : `NO`}
                        </span>
                      </button>

                      ${configCard.deadline ? `
                            <fieldset class="card__date-deadline">
                                <label class="card__input-deadline-wrap">
                                <input
                                    class="card__date"
                                    type="text"
                                    placeholder="23 September"
                                    name="date"
                                    value="23 September"
                                />
                                </label>
                                <label class="card__input-deadline-wrap">
                                <input
                                    class="card__time"
                                    type="text"
                                    placeholder="11:15 PM"
                                    name="time"
                                    value="11:15 PM"
                                />
                                </label>
                            </fieldset>
                      ` : ``}

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">
                            ${configCard.repeat ? `YES` : `NO`}
                        </span>
                      </button>

                      <fieldset class="card__repeat-days">
                        <div class="card__repeat-days-inner">
                          ${createFeildRepeatDays()}                          
                        </div>
                      </fieldset>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${createFeildCardHashtagList()}
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
                      src="img/sample-img.jpg"
                      alt="task picture"
                      class="card__img"
                    />
                  </label>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                      ${createFeildCardColorWrap(configCard.color)}
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

  function createFeildRepeatDays() {
    function createRepeatDays() {
      const days = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
      return days.map(createRepeatDay).join(``);
    }

    function createRepeatDay(day) {
      const result = `
        <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}-6"
        name="repeat"
        value="${day}"
        ${(Math.random() - 0.5) > 0 ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${day}-6"
          >${day}</label
        >
      `;
      return result;
    }

    return createRepeatDays();
  }

  function createFeildCardColorWrap(configColor) {
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

  function createFeildCardHashtagList() {
    function createCardHashtagList() {
      const hashtagList = [`#repeat`, `#cinema`, `#entertaiment`];
      return hashtagList.map(createCardHashtag).join(``);
    }

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

    return createCardHashtagList();
  }

  return createNewCard(config);
};
