import store from '../../redux/store';
import {isLoggedIn, setUserId} from '../../redux/actions/app.actions';
import StorageUtil from './StorageUtil';
import UserUtils from './UserUtils';
import UserUtil from './UserUtils';

class UserTokenUtil extends StorageUtil {
  constructor() {
    super(UserTokenUtil.USER_TOKEN_DATA_KEY);
  }
  static USER_TOKEN_DATA_KEY = 'token';

  saveUserToken(userToken) {
    return super.saveData(userToken).then(() => {
      store.dispatch(isLoggedIn(true));
    });
  }

  getUserToken() {
    return super.getData();
  }

  async isLoggedIn() {
    try {
      let userToken = await this.getUserToken();
      let userId = await new UserUtil().getUserId();
      const isLogin = !!(userToken && userId);
      store.dispatch(isLoggedIn(isLogin));
      store.dispatch(setUserId(userId));
      return isLogin;
    } catch (err) {
      return null;
    }
  }

  logout() {
    super.clear();
    store.dispatch(isLoggedIn(false));
    store.dispatch(setUserId(null));
  }
}

export default UserTokenUtil;
