import React, {Component} from 'react';
import store from '../../utilities/store';
// Components
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';

const TYPES = [
    {
        key: 'cleaning',
        name: 'Cleaning'
    },
    {
        key: 'cooking',
        name: 'Cooking'
    },
    {
        key: 'driving',
        name: 'Driving'
    },
    {
        key: 'shopping',
        name: 'Shopping'
    },
];

export default class LifeLine extends Component {
    constructor() {
        super();

        this.state = {};
        this.lifeLine = null;

        this.pickLifeLine = this.pickLifeLine.bind(this);
    }

    componentDidMount() {
        const {params} = this.props;

        store.subscribe('lifeline', state => {
            this.setState(state);
        });

        this.lifeLine = params.lifeline;
    }

    componentWillUnmount() {
        store.unsubscribe('lifeline');
    }

    get getLifeLines() {
        const {
            state: {lifeLines},
            lifeLine
        } = this;

        if (!lifeLines || !lifeLine) {
            return [];
        }

        return Object.keys(lifeLines)
            .map(key => lifeLines[key])
            .filter(_lifeLine => _lifeLine.name === lifeLine);
    }

    pickLifeLine(id) {
        const {lifeLines} = this.state;

        if (!id) {
            return null;
        }

        let lifeLine = lifeLines[id];

        if (!lifeLine) {
            return null;
        }

        lifeLine = Object.assign({}, lifeLine, {
            done: true
        });

        let newLifeLines = Object.assign({}, lifeLines, {
            [id]: lifeLine
        });

        store.setStore({
            lifeLines: newLifeLines
        })
    }

    render() {
        const {
            getLifeLines,
            pickLifeLine,
            lifeLine
        } = this;

        let getGroup = TYPES.find(type => type.key === lifeLine);

        return (
            <div>
                <h1 className="header">{getGroup && getGroup.name}</h1>
                <h2 className="subheader">{getLifeLines.length} people</h2>

                <List>
                    {getLifeLines.map(lifeLine => (
                        <div key={lifeLine.id}>
                            <ListItem
                                onClick={() => pickLifeLine(lifeLine.id)}
                                leftAvatar={<Avatar src={lifeLine.user.image} />}
                                rightIconButton={
                                    (!lifeLine.done && (
                                        <a
                                           href="#"
                                           className="pickLink"
                                           style={{
                                               top: 22,
                                               right: 10
                                           }}>
                                            Accept
                                        </a>
                                    ))
                                    || (
                                        <span
                                            className="positive"
                                            style={{
                                                top: 22,
                                                right: 10
                                            }}>
                                            Done
                                        </span>
                                    )}
                                primaryText={lifeLine.user.name} />
                            <Divider />
                        </div>

                    ))}
                </List>
            </div>
        );
    }
}
