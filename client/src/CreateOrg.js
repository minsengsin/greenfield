import React from 'react';
import './signup.css';
import axios from 'axios';
import Header from './Header.js';

class CreateOrg extends React.Component {
  constructor(props) {
    super(props);
    // const numbers = [0,1,2,3,4,5,6,7,8,9,'(',')','-'];
    this.state = {
      username: '',
      password: '',
      name: '',
      bio: '',
      site: '',
      location: '',
      contact: '',
      userUsername: this.props.match.params.username,
      validPhone: [0,1,2,3,4,5,6,7,8,9,'(',')','-'],
      validPhoneStr: '0123456789()-',
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleBio = this.handleBio.bind(this);
    this.handleSite = this.handleSite.bind(this);
    this.handleLoc = this.handleLoc.bind(this);
    this.handleContact = this.handleContact.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.onPhoneKeyDown = this.onPhoneKeyDown.bind(this);
  }

  handleCreate() {
    axios
      .post('/orgs', {
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        bio: this.state.bio,
        site: this.state.site,
        location: this.state.location,
        contact: this.state.contact,
        userUsername: this.state.userUsername
      })
      .then(() => {
        this.props.history.push('/');
      });
  }

  // If this looks redundant, it's because it is.
  // During Solo Week I learned how to handle simple form/state updates with
  // arrow functions. I'll leave that up to the inheriter of this code to
  // figure out.
  handleUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleBio(e) {
    this.setState({
      bio: e.target.value,
    });
  }

  handleSite(e) {
    this.setState({
      site: e.target.value,
    });
  }

  handleLoc(e) {
    this.setState({
      location: e.target.value,
    });
  }

  handleContact(e) {
    const targLen = e.target.value.length - 1;
    const phoneLen = this.state.contact.length;
    if (phoneLen <= 13 && this.state.validPhoneStr.indexOf(e.target.value[targLen]) !== -1) {
      if(phoneLen === 0) {
        this.setState({ contact: '(' + e.target.value[targLen] })
      } else if (phoneLen === 4) {
        this.setState({ contact: this.state.contact + ') ' + e.target.value[targLen] })
      } else if (phoneLen === 9) {
        this.setState({ contact: this.state.contact + '-' + e.target.value[targLen] })
      } else {
        this.setState({ contact: e.target.value})
      }
    }
  }

  onPhoneKeyDown(e) {
    const len = this.state.contact.length;
    if (e.keyCode === 8
      && (this.state.contact.length === 7
        || this.state.contact.length === 9
        || this.state.contact.length === 14)
      ) {
      console.log('this is the state.contact.length: ', this.state.contact.length);
      console.log('backspace called');
      this.setState({ contact: '' })
    }
  }

  render() {
    return (
      <div>
        <Header className="ui header" name={this.state.userUsername}/>
        <div className="ui container" style={{paddingTop: '85px'}}>
          <div className="ui middle aligned center aligned grid">
            <div className="column" style={{maxWidth: '450px'}}>
              <h2 className="ui blue image header">
                <div className="content">Create New Organization</div>
              </h2>
              <div className="ui large form">
                <div className="ui stacked segment">
                  <div className="field">
                    <div className="ui left input">
                      <label htmlFor="username" />
                      <input
                        style={{
                          marginBottom: '-10px'
                        }}
                        value={this.state.username}
                        onChange={e => {
                          this.handleUsername(e);
                        }}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="ui left input">
                      <label htmlFor="password" />
                      <input
                        style={{
                          marginBottom: '-10px'
                        }}
                        value={this.state.password}
                        onChange={e => {
                          this.handlePassword(e);
                        }}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="ui left input">
                      <label htmlFor="name" />
                      <input
                        style={{
                          marginBottom: '-10px'
                        }}
                        value={this.state.name}
                        onChange={e => {
                          this.handleName(e);
                        }}
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Organization Name"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="ui left input">
                      <label htmlFor="location" />
                      <input
                        style={{
                          marginBottom: '-10px'
                        }}
                        value={this.state.location}
                        onChange={e => {
                          this.handleLoc(e);
                        }}
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Location"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="ui left input">
                      <label htmlFor="site" />
                      <input
                        style={{
                          marginBottom: '-10px'
                        }}
                        value={this.state.date}
                        onChange={e => {
                          this.handleSite(e);
                        }}
                        type="text"
                        id="site"
                        name="site"
                        placeholder="Website"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="ui left input">
                      <label htmlFor="contact" />
                      <input
                        value={this.state.contact}
                        onChange={e => {
                          this.handleContact(e);
                        }}
                        type="tel"
                        id="contact"
                        name="contact"
                        placeholder="Phone Number"
                        onKeyDown={this.onPhoneKeyDown}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="ui left input">
                      <label htmlFor="bio" />
                      <textarea
                        style={{
                          marginTop: '-10px',
                          maxHeight: '170px',
                          minHeight: '170px',
                        }}
                        value={this.state.bio}
                        onChange={e => {
                          this.handleBio(e);
                        }}
                        type="text"
                        id="bio"
                        name="bio"
                        placeholder="Organization Bio"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      this.handleCreate();
                    }}
                    className="ui fluid large blue submit button">
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateOrg;
