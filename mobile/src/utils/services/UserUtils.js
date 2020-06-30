import StorageUtil from './StorageUtil';
import store from '../../redux/store';
import {setUserId} from '../../redux/actions/app.actions';

class UserUtil extends StorageUtil {
  constructor() {
    super(UserUtil.USER_DATA_KEY);
  }
  static USER_DATA_KEY = 'user';

  saveUser(user) {
    store.dispatch(setUserId(user.id));
    return super.saveData(JSON.stringify(user));
  }

  async getUser() {
    return JSON.parse(await super.getData());
  }

  async getUserId() {
    try {
      const {id} = JSON.parse(await super.getData());
      return id;
    } catch (err) {
      return null;
    }
  }
}

export default UserUtil;
