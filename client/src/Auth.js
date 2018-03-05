import axios from 'axios';

// Apologies in advance; this was a pretty last minute hack job.
// I recommend reading the link below for pointers.
//
// https://tylermcginnis.com/react-router-protected-routes-authentication/
//
// Understand that Auth is merely a protocol: It will look slightly different
// for every project. This worked decently for us, but there are likely bugs we
// didn't catch.

// The basic idea is to import this object in each file where
// authentication needs to happen. The client can also "remember" the
// user (like a session) by saving this object to local storage. It
// does not currently do this.
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
