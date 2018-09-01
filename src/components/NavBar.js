import {NavLink} from 'react-router-dom';
import React, {Component} from 'react';

export default class NavBar extends Component {
    render () {
        return (
            <ul>
                <li><NavLink to="/">Главная</NavLink></li>
                <li><NavLink to="/login">Вход</NavLink></li>
            </ul>
        )
    }
}