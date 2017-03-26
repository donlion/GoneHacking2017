import React, {Component} from 'react';
import goto from '../../utilities/goto';
import {
    subscribe,
    unsubscribe,
    setStore
} from '../../utilities/store';
import {post} from '../../utilities/request';
import getPath from 'lodash/get';
// Components
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    avatar: {
        backgroundColor: 'transparent',
        top: 16
    }
};

export default class SignUp extends Component {
    constructor() {
        super();

        this.references = {};

        this.state = {};

        this.signUp = this.signUp.bind(this);
    }

    componentDidMount() {
        subscribe('signup', state => this.setState(state));
    }

    componentWillUnmount() {
        unsubscribe('signup');
    }

    signUp() {
        const {form} = this.references;

        return post('/users', {
            name: form.name.value,
            email: form.email.value
        }).then(res => {
            let data = get(res, 'data.data');

            if (!data) {
                return null;
            }

            setStore({
                signedUp: true,
                newUser: {
                    name: data.name,
                    email: data.email
                }
            });
        });
    }

    get getList() {
        const {signUp} = this;

        return (
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
        );
    }

    get getPickList() {
        return (
            <List>
                <ListItem
                    leftAvatar={(
                        <Avatar
                            src="/static/icons/kids.png"
                            size={22}
                            style={styles.avatar} />)
                    }
                    rightIcon={(
                        <a
                            className="pickLink"
                            href="#">
                            Pick
                        </a>
                    )}
                    primaryText="Pick up kids"/>
            </List>
        );
    }

    get getContent() {
        const {
            getList,
            getPickList,
            state: {signedUp}
        } = this;

        if (signedUp) {
            return getPickList;
        }

        return getList;
    }

    render() {
        const {getContent} = this;

        return (
            <form ref={c => this.references.form = c}>
                <h1 className="header">Sign up</h1>

                {getContent}
            </form>
        );
    }
}
