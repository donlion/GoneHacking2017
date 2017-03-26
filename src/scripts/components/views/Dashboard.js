import React, {Component} from 'react';
import goto from '../../utilities/goto';
import store, {setStore} from '../../utilities/store';
import {get} from '../../utilities/request';
import getPath from 'lodash/get';
// Components
import RaisedButton from 'material-ui/RaisedButton';

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

export default class Dashboard extends Component {
    constructor() {
        super();

        this.references = {};
        this.state = {};

        this.fetchLifeLines = this.fetchLifeLines.bind(this);
    }

    componentDidMount() {
        const {fetchLifeLines} = this;

        store.subscribe('dashboard', state => {
            this.setState(state);
        });

        fetchLifeLines();
    }

    componentWillUnmount() {
        store.unsubscribe('dashboard');
    }

    get getList() {
        const {
            lifeLines,
            lifeLinesLoaded
        } = this.state;

        if (!lifeLines) {
            return null;
        }

        let lifeLinesArray = Object.keys(lifeLines).map(key => lifeLines[key]);
        
        if (!lifeLinesLoaded || !lifeLinesArray.length) {
            return null;
        }

        let groups = TYPES.map(type => {
            return {
                name: type.name,
                lifeLines: [].concat(lifeLinesArray).filter(lifeLine => lifeLine.name === type.key)
            };
        });

        return (
            <div>
                {groups.map((group, index) => (
                    <div
                        key={index}
                        className="lifelinesGroup">
                        <h2 className="lifelinesHeader">{group.name}</h2>
                        <h3 className="lifelinesSubheader">{group.lifeLines.length} people</h3>
                        <div className="lifelineRow">
                            <ul className="lifelines">
                                {group.lifeLines.map((lifeLine, index) => (
                                    <li
                                        key={index}
                                        className="lifeline">
                                        <img src={`https://api.adorable.io/avatars/90/${lifeLine.user.email}`} />
                                    </li>
                                ))}
                            </ul>

                            <div>
                                <RaisedButton
                                    primary={true}
                                    label="Pick"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    get getUser() {
        const {authedUser} = this.state;

        if (!authedUser) {
            return {};
        }

        return authedUser;
    }

    get getLoading() {
        const {lifeLinesLoaded} = this.state;

        if (!lifeLinesLoaded) {
            return (
                <p className="subheader">
                    Currently loading..
                </p>
            );
        }

        return null;
    }

    fetchLifeLines() {
        let lifeLines = TYPES.map(type => {
            return get(`/lifelines?name=${type.key}`)
                .then(res => {
                    let data = getPath(res, 'data');

                    console.log('data', data);

                    if (!data) {
                        return null;
                    }

                    let lifeLines = data;

                    console.log('got it', lifeLines);

                    return setStore({
                        lifeLines: lifeLines,
                        lifeLinesLoaded: true
                    });
                });
        });
    }

    render() {
        const {
            getList,
            getUser,
            getLoading
        } = this;

        console.log({state: this.state});

        return (
            <div ref={c => this.references.container = c}>
                <h1 className="header">Welcome {getUser.name}</h1>

                {getLoading || getList}
            </div>
        );
    }
}
