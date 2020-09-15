import React from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import './App.css';

class App extends React.Component{

  state = {
    users: [],
    loading: false,
    alert: null,
  };

  //search github users
  searchUsers = async text => {
    const res = await axios.get(
      `https://api.github.com/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

    this.setState({ users:res.data, loading: false });
  };

  // Clear users from state

  clearUsers = () => this.setState({ users: [], loading: false });

  // Set Alert
  setAlert = (msg, type) => {
     this.setState({ alert: { msg, type } });
  };

  render() {
    const { users,loading } = this.state;

    return (
      <div className= 'App'>
        <Navbar />
        <div className='container'>
        <Search searchUsers={this.searchUsers}
                clearUsers={this.clearUsers}
                showClear={users.length > 0 ? true : false}
                 />
        <Users loading={loading} users={users}/>
        </div>
      </div>
    );
  }
}
export default App;
