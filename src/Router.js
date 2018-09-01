import React from 'react';
import { Route, Switch } from 'react-router';
import Index from './components/Index';
import Login from './components/Login';
import Registration from  './components/Registration';
import CreatePost from  './components/admin/CreatePost';

export default (
    <Switch>
        <Route exact path="/posts" component={Index} /> //todo change
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/create-post" component={CreatePost} />
    </Switch>
);