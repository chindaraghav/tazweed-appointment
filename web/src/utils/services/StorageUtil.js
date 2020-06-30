class StorageUtil {
  constructor(key) {
    this.key = key;
  }
  saveData(data) {
    localStorage.setItem(this.key, data);
  }
  getData() {
    return localStorage.getItem(this.key);
  }
  deleteData() {
    localStorage.removeItem(this.key);
  }
  clear() {
    localStorage.clear();
  }
}

export default StorageUtil;
