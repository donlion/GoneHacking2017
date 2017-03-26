import React, {Component} from 'react';
import goto from '../../utilities/goto';
import {setStore} from '../../utilities/store';
import {post} from '../../utilities/request';
// Components
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class Home extends Component {
    constructor() {
        super();

        this.references = {};

        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);

    }

    signIn() {
        const {form} = this.references;

        return post('/login', {
            email: form.email.value
        }).then(res => {
            let {
                email,
                name
            } = res.data.data;

            setStore({
                signedIn: true,
                authedUser: {
                    name,
                    email
                }
            });

            return goto('/dashboard');
        });
    }

    signUp() {
        return goto('/signup');
    }

    render() {
        const {
            signIn,
            signUp
        } = this;

        return (
            <form ref={c => this.references.form = c}>
                <div className={'logo'}>
                    <img src={'/static/logo.png'}/>
                </div>

                <List>
                    <ListItem disabled={true}>
                        <TextField
                            fullWidth={true}
                            floatingLabelText={'Email'}
                            name={'email'} />
                    </ListItem>
                    <ListItem disabled={true}>
                        <TextField
                            fullWidth={true}
                            floatingLabelText={'Password'}
                            type={'password'}
                            name={'password'}/>
                    </ListItem>
                    <ListItem disabled={true}>
                        <RaisedButton
                            label="Sign in"
                            fullWidth={true}
                            onClick={signIn}
                            primary={true}/>
                    </ListItem>
                    <ListItem disabled={true}>
                        <FlatButton
                            label="Sign up"
                            onClick={signUp}
                            fullWidth={true} />
                    </ListItem>
                </List>
            </form>
        );
    }
}
