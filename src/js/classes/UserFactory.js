import collectionTypes from '../constants/collectionTypes';
import User from './User';
import Admin from './Admin';

export default class UserFactory {
  static create(type, object) {
    switch (type) {
      case collectionTypes.HELGA:
        return new User(object);
      case collectionTypes.PABLO:
        return new User(object);
        case collectionTypes.ALEX:
          return new Admin(object);
        case collectionTypes.KATE:
          return new User(object);
      default: {
    
      }
    }
  }
}
