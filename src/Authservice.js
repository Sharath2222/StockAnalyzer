class AuthService {
  static users = [];
  static currentUser = null;

  static register(user) {
    this.users.push(user);
  }

  static login(username, password) {
    const user = this.users.find((u) => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
    }
    return user;
  }

  static getCurrentUser() {
    return this.currentUser;
  }

  static logout() {
    this.currentUser = null;
  }
}

export default AuthService;
