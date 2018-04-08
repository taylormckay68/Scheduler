import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Admin from './components/Admin/Admin';
import Users from './components/Users/Users';
import Requests from './components/Requests/Requests';
import Calendar from './components/Calendar/Calendar';

export default(
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/admin" render={() => {
            return (
                <Admin>
                    <Switch>
                        <Route path='/admin/users' component={Users}/>
                        <Route path='/admin/requests' component={Requests}/>
                        <Route path='/admin/calendar' component={Calendar}/>                    
                    </Switch>
                </Admin>
            )
        }}/>
    </Switch>
)