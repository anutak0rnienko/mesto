export default class Section {
    constructor({renderer, item}, selectorContainer) {
        this._renderer = renderer;
        this._container = document.querySelector(selectorContainer);
        this._renderItems = item;
    }

    addItem(element){
        this._container.prepend(element);
    }

    renderСards(items) {
        items.forEach((item) => {
            this._renderer(item);
        })
    }

    setItem(item) {
        this._renderItems = item;
    }
}