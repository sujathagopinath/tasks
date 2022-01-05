import React from 'react';
import LoginTemplate from '../../templates/user/login';
import '../../styles/user/login.scss';
import { withTranslation } from 'react-i18next';
import axios from 'axios';
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    submitFormHandler(e) {
        axios.post('/v1/app/user/login', { 
            email: this.state.email, 
            password: this.state.password
        }).then(data => {
            console.log({data});
        }).catch(err => {
            console.log({err});
        })
        e.preventDefault();
    }

    render() {
        const { t } = this.props;
        return (
            <LoginTemplate context={this} translate={t}/>
        );
    }
}

export default withTranslation()(Login);