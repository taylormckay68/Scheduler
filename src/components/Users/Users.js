import React, { Component } from 'react';
import axios from 'axios';

export default class Users extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios.get('/api/getuserlevels').then(res => {
            console.log(res.data);
            this.setState({
                users: res.data
            })
        })
    }
    handleApprove(user) {
        axios.post('/api/approveuser', {userId: user}).then(() => {
            axios.get('/api/getuserlevels').then(res => {
                console.log(res.data);
                this.setState({
                    users: res.data
                })
            })
        })
    }
    handleDeny(user) {
        console.log(user);
        axios.post('/api/denyuser', {userId: user}).then(() => {
            
        })
    }
    handleDelete(user) {
        console.log(user);        
        axios.delete('/api/deleteuser', {userId: user}).then(() => {

        })
    }
    render() {
        return(
            <div className="users-container">
                <h3>Name</h3>
                {this.state.users.map((e, i, arr) => {
                    return(
                        <div key={e.id}>
                            <p>{e.display_name}</p>
                            <div>
                                <p>{e.acct_permissions}</p>
                                <button value={e.id} onClick={(e) => this.handleApprove(e.target.value)}>Approve</button>
                                <button value={e.id} onClick={(e) => this.handleDeny(e.target.value)}>Deny</button>
                                <button value={e.id} onClick={if(window.confirm('Are you sure you want to delete this user?') {
                                    (e) => this.handleDelete(e.target.value)
                                    }
                                }>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}