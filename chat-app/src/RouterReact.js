import React from 'react';
import Login from './Login';
import App from './App';

import {Router, Route, Switch} from 'react-router-dom';
const createHistory = require("history").createBrowserHistory;
class RouterReact extends React.Component{

    render(){
        return <Router history={createHistory()}>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/chat" component={App}/>
            </Switch>
        </Router>;
    }
}


export default RouterReact;