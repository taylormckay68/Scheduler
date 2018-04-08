import React, { Component } from 'react';
import axios from 'axios';

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            date: ''
        }
    }
    handleDateChange(val) {
        this.setState({
            date: val
        })
    }
    componentWillMount() {
        axios.get('/api/me').then(res => {
            console.log('RES: ', res);
            
            this.setState({
                name: res.data.display_name
            })
        })
    }
    render() {
        
        return(
            <div>
                <h1>Welcome back {this.state.name}</h1>
                <form>
                    <input type="date" name="bday" onChange={(e) => this.handleDateChange(e.target.value)}/>
                    <input type="submit" onClick={console.log(this.state.date)}/>
                </form>
            </div>
        )
    }
}