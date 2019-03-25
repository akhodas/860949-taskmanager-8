import createElement from './create-element';

export default class AbstractComponentRender {
  constructor() {
    if (new.target === AbstractComponentRender) {
      throw new Error(`Can't instantiate BaseAbstractComponentRender, only concrete one.`);
    }

    this._element = null;
    this._isDeleted = false;
  }

  get element() {
    return this._element;
  }

  get isDeleted() {
    return this._isDeleted;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this._element = createElement(this.template);
    this.createListeners();
    return this._element;
  }

  unrender() {
    this.removeListeners();
    this._element.remove();
    this._element = null;
  }

  delete() {
    this._isDeleted = true;
  }

  createListeners() {}

  removeListeners() {}

  update() {}

}
