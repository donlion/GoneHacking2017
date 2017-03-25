import React, {Component} from 'react';
import goto from '../../utilities/goto';
// Components
import {Card, CardHeader} from 'material-ui/Card';
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
        return goto('/dashboard');
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
            <Card
                style={{
                    maxWidth: 320,
                    margin: '0 auto'
                }}
                ref={c => this.references.card = c}>
                <CardHeader title="Sign in"/>
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
                            onClick={signIn}/>
                    </ListItem>
                    <ListItem disabled={true}>
                        <FlatButton
                            label="Sign up"
                            onClick={signUp}
                            fullWidth={true} />
                    </ListItem>
                </List>
            </Card>
        );
    }
}