export default class Section {
    constructor({renderer}, selectorContainer) {
        this._renderer = renderer;
        this._container = document.querySelector(selectorContainer);
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