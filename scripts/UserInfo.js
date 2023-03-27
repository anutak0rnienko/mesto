export default class UserInfo {
    constructor({elementUserName, elementUserJob}) {
        this._elementUserName = document.querySelector(elementUserName);
        this._elementUserJob = document.querySelector(elementUserJob);
    }

    getUserInfo() {
        return {
            name: this._elementUserName.textContent,
            link: this._elementUserJob.textContent,
        }
    };

    setUserInfo(data) {
        this._elementUserName.textContent = data.name;
        this._elementUserJob.textContent = data.link;
    };
}