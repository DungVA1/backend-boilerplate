import Db from '../libs/db';

const userDb = new Db('users');

class User {
  getUser(userId) {
    return userDb.getItem(userId);
  }

  getUsers() {
    return userDb.getListItem();
  }

  addUser(user) {
    return userDb.insertItem(user);
  }

  editUser(user, userId) {
    return userDb.updateItem(user, userId);
  }

  deleteUser(userId) {
    return userDb.deleteItem(userId);
  }
}

export default User;
