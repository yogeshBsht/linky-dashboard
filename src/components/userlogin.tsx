// ** create-user.component.js ** //
import React, { Component } from 'react';
import axios from 'axios';

type LoginProps = {
    userName: string,
    password: string,
    hasError: boolean,
    errorMessage: string
}

export default class LoginUser extends Component<LoginProps> {
    static defaultProps = {
        userName: "",
        password: "",
        hasError: false,
        errorMessage: ""
    }
    constructor(props: LoginProps) {
        super(props)
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUserName(e: React.FormEvent<HTMLInputElement>) {
        this.setState({ userName: e.currentTarget.value })
    }

    onChangePassword(e: React.FormEvent<HTMLInputElement>) {
        this.setState({ password: e.currentTarget.value })
    }

    onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const loginPayload = {
            "username": this.props.userName,
            "password": this.props.password
        };
        axios.post('http://localhost:5000/login', loginPayload)
            .then((res) => {
                alert(res.data)
            }).catch((error) => {
                alert(error)
            });
    }

    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User Name</label>
                        <input type="text" value={this.props.userName} onChange={this.onChangeUserName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" value={this.props.password} onChange={this.onChangePassword} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-success btn-block" />
                    </div>
                </form>
            </div>
        )
    }
}