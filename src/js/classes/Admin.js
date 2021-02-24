import User from './User';

export default class Admin extends User {
    constructor(name,role) {
        super(name);
        this._role = role;
      }


}
