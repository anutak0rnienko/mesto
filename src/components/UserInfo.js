export default class UserInfo {
    constructor({elementUserName, elementUserJob, elementUserAvatar}) {
        this._elementUserName = document.querySelector(elementUserName);
        this._elementUserJob = document.querySelector(elementUserJob);
        this._elementUserAvatar = document.querySelector(elementUserAvatar);
    }

    getUserInfo() {
        return {
            name: this._elementUserName.textContent,
            about: this._elementUserJob.textContent,
        }
    };

    setUserInfo({name, about}) {
        this._elementUserName.textContent = name;
        this._elementUserJob.textContent = about;
    };

    getUserId() {
        return this._id;
    }

    setUserId(id) {
        return this._id = id;
    }

    setUserAvatar({ avatar }) {
        this._elementUserAvatar.src = avatar;
    };

}