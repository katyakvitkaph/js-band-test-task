export default class User {
    constructor(name) {
        this.name = name;
      }

    get name() {
      return this._name
    }

    set name(newName) {
      return this._name = newName
  }
  }
  