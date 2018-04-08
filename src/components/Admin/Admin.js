import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Admin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    
    render() {
        return(
            <div>
                <nav>
                    <h2>Admin Portal</h2>
                    <Link to='/admin/users'>Users</Link>
                    <Link to='/admin/requests'>Requests</Link>
                    <Link to='/admin/calendar'>Calendar</Link>
                </nav>
                {this.props.children}
            </div>
        )
    }
}