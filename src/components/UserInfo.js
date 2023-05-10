export default class UserInfo {
    constructor({ elementUserName, elementUserJob, elementUserAvatar }) {
        this._elementUserName = document.querySelector(elementUserName);
        this._elementUserJob = document.querySelector(elementUserJob);
        this._elementUserAvatar = document.querySelector(elementUserAvatar);
    }

    getUserInfo() {
        return {
            name: this._elementUserName.textContent,
            about: this._elementUserJob.textContent,
        };
    }

    setUserInfo({ name, about, avatar, _id }) {
        this._elementUserName.textContent = name;
        this._elementUserJob.textContent = about;
        this._elementUserAvatar.src = avatar;
        this._id = _id;
    }

    getUserId() {
        return this._id;
    }
};
