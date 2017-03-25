import React, {Component} from 'react';
import goto from '../../utilities/goto';
// Components
import {Card, CardHeader} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            redirect: false
        };

        this.signUp = this.signUp.bind(this);
    }

    get getRedirect() {
        const {redirect} = this.state;

        console.log({redirect});

        if (!redirect) {
            return null;
        }

        return (
            <Redirect to={{
                pathname: redirect
            }} />
        );
    }

    signUp() {
        console.log('sign up');

        setTimeout(() => {
            goto('/dashboard');
        }, 1000);
    }

    render() {
        const {
            getRedirect,
            signUp
        } = this;

        if (getRedirect) {
            return getRedirect;
        }

        return (
            <div>
                <Card style={{
                    maxWidth: 320,
                    margin: '0 auto'
                }}>
                    <CardHeader style={{fontWeight: 'bold'}} title="Sign up"/>
                    <List>
                        <ListItem disabled={true}>
                            <TextField
                                fullWidth={true}
                                floatingLabelText="Name"
                                name={'name'} />
                        </ListItem>
                        <ListItem disabled={true}>
                            <TextField
                                fullWidth={true}
                                floatingLabelText="Email"
                                name={'email'} />
                        </ListItem>
                        <ListItem disabled={true}>
                            <TextField
                                fullWidth={true}
                                floatingLabelText="Password"
                                type="password"
                                name={'password'} />
                        </ListItem>
                        <ListItem disabled={true}>
                            <RaisedButton
                                label="Sign up"
                                fullWidth={true}
                                onClick={signUp} />
                        </ListItem>
                    </List>
                </Card>
            </div>
        );
    }
}
