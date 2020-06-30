import store from "../../redux/store";
import { isLoggedIn } from "../../redux/actions/app.actions";
import StorageUtil from "./StorageUtil";

class UserTokenUtil extends StorageUtil {
  constructor() {
    super(UserTokenUtil.USER_TOKEN_DATA_KEY);
  }
  static USER_TOKEN_DATA_KEY = "token";

  saveUserToken(userToken) {
    store.dispatch(isLoggedIn(true));
    super.saveData(userToken);
  }

  getUserToken() {
    return super.getData();
  }

  isLoggedIn() {
    const isLogin = this.getUserToken() !== "null" && !!this.getUserToken();
    store.dispatch(isLoggedIn(isLogin));
    return isLogin;
  }

  logout() {
    super.clear();
    store.dispatch(isLoggedIn(false));
  }
}

export default UserTokenUtil;
