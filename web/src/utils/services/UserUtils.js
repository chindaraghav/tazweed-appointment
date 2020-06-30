import StorageUtil from "./StorageUtil";

class UserUtil extends StorageUtil {
    constructor() {
        super(UserUtil.USER_DATA_KEY);
    }
    static USER_DATA_KEY = "user";

    saveUser(user) {
        super.saveData(JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(super.getData());
    }

    getUserId() {
        const { id } = JSON.parse(super.getData());
        return id
    }
}

export default UserUtil;
