import React, {Component} from 'react';
import Router from '../Router';
import Navbar from './NavBar';

export default class App extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                <Navbar/>
                {Router}
            </div>
        );
    }
}