/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/create-card.js":
/*!****************************!*\
  !*** ./src/create-card.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((config) => {

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
});


/***/ }),

/***/ "./src/create-filter.js":
/*!******************************!*\
  !*** ./src/create-filter.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((configFilter) => {
  const result = `
            <input
                type="radio"
                id="filter__${configFilter.id}"
                class="filter__input visually-hidden"
                name="filter"
                ${configFilter.checked ? `checked` : ``}
                ${configFilter.count ? `` : `disabled`}
            />
            <label for="filter__${configFilter.id}" class="filter__label">
                ${configFilter.title || configFilter.id.toUpperCase()} 
                <span class="filter__${configFilter.id}-count">
                    ${configFilter.count}
                </span>
            </label>
        `;

  return result;
});


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _create_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-filter */ "./src/create-filter.js");
/* harmony import */ var _create_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-card */ "./src/create-card.js");



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
    return config.map(_create_filter__WEBPACK_IMPORTED_MODULE_0__["default"]).join(``);
  }
}

function drawCards(configCards) {
  const boardTasks = document.getElementsByClassName(`board__tasks`)[0];

  if (boardTasks) {
    const cards = createCardsList(configCards);

    boardTasks.innerHTML = cards;
  }

  function createCardsList(config = []) {
    return config.map(_create_card__WEBPACK_IMPORTED_MODULE_1__["default"]).join(``);
  }
}

function generateConfigCards(count = 0) {
  const colorCard = [`black`, `yellow`, `green`, `blue`, `pink`];
  const cards = [];

  for (let i = 0; i < count; i++) {
    const card = {};

    card.edit = (Math.random() - 0.8) > 0 ? true : false;
    card.repeat = (Math.random() - 0.5) > 0 ? true : false;
    card.deadline = (Math.random() - 0.8) > 0 ? true : false;
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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map