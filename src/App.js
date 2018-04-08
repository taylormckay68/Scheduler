import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './main.css';
import router from './router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false
    }
  }
  componentDidMount() {
    axios.get('/api/me').then(res => {
      console.log('RES: ', res);
      if(res.data) {
        if(res.data.acct_type === 'admin') {
          this.setState({
            admin: true
          })
        } else {
          console.log('you must be an admin');
        }
      }
    })
  }
  render() {
    return (
      <div>
        <div className="nav">
          <h1>IHC Mammo Scheduler ( . Y . )</h1>
          <Link to='/admin'>Admin</Link>
          {/* {this.state.admin && <Link to='/admin'>Admin</Link>} */}
        </div>
        {router}
      </div>
    );
  }
}

export default App;
