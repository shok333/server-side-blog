import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginAction} from '../redux/actions/loginAction'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class Login extends Component {

    state = {
        login: '',
        password: ''
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.loginRequest({
          ...this.state,
        });
    };

    loginValueHandler = (event) => {
        this.setState({
            login: event.target.value
        });
    };

    passwordValueHandler = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.submitHandler} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input onChange={this.loginValueHandler} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input onChange={this.passwordValueHandler} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </FormItem>
            </Form>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginRequest: bindActionCreators(loginAction, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(Form.create()(Login));