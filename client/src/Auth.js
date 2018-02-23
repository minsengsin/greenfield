import axios from 'axios';

const Auth = {
  isAuthenticated: false,
  username: '',
  password: '',
  authenticate(callback) {
    console.log('Calling Authenticate');
    console.log(`Currently, isAuthenticated == ${this.isAuthenticated}`);
    axios
      .post('/login', {username: this.username, password: this.password})
      .then(res => {
        console.log(res);
        console.log(
          `A short time later... isAuthenticated == ${this.isAuthenticated}`,
        );
        this.username = res.data.username;
        this.password = res.data.password;
        console.log(`Status: ${res.data.authenticated}`);
        this.isAuthenticated = res.data.authenticated;
        callback(this.isAuthenticated);
      });
  },
  signout() {
    this.isAuthenticated = false;
  },
};

export default Auth;
