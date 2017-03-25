import React, {Component} from 'react';
import goto from '../../utilities/goto';
import {setStore} from '../../utilities/store';
// Components
import {List, ListItem} from 'material-ui/List';

export default class Dashboard extends Component {
    constructor() {
        super();

        this.references = {};
    }

    get getList() {
        console.log({props: this.props});
    }

    render() {
        const {
            getList
        } = this;

        return (
            <div ref={c => this.references.container = c}>
                <h1 className="header">Dashboard</h1>


            </div>
        );
    }
}
