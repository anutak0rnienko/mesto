export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._popupBtnImage = this._popup.querySelector('.popup__close_button_image');
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscape);
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscape);
    }

    _handleEscape(evt) {
        if (evt.key === "Escape") {
          this.close();
        };
      };
      setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
              };
              if (evt.target.classList.contains('popup__close')) {
                this.close();
              };
        });
      }

}