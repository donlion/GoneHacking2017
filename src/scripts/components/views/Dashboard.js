import React, {Component} from 'react';
import goto from '../../utilities/goto';
import store, {setStore} from '../../utilities/store';
import {get} from '../../utilities/request';
import getPath from 'lodash/get';
import {Route} from 'react-router';
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
                key: type.key,
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
                                        <img src={`${lifeLine.user.image}`} />
                                    </li>
                                ))}
                            </ul>

                            <div>
                                <RaisedButton
                                    primary={true}
                                    label="Pick"
                                    onClick={e => goto(`/dashboard/${group.key}`)}/>
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

    get getPeople() {
        const {lifeLines} = this.state;

        if (!lifeLines) {
            return [];
        }

        let lifeLinesArray = Object.keys(lifeLines).map(key => lifeLines[key]);

        if (!lifeLinesArray.length) {
            return [];
        }

        return lifeLinesArray.reduce((result, item) => {
            console.log({result});
            if (result.includes(item.user.name)) {
                return result;
            }

            result = result.concat(item.user.name);

            return result;
        }, []);
    }

    fetchLifeLines() {
        return TYPES.map(type => {
            return get(`/lifelines?name=${type.key}`)
                .then(res => {
                    let data = getPath(res, 'data');

                    console.log('data', data);

                    if (!data) {
                        return null;
                    }

                    let lifeLines = Object.keys(data)
                        .reduce((result, id) => {
                            let lifeLine = data[id];

                            let userName = lifeLine.user.name.split(' ')[0].toLowerCase();
                            if (userName === 'joe') {
                                userName = 'saul';
                            }

                            if (lifeLine.user.name.includes('Jr.')) {
                                userName = 'junior';
                            }

                            lifeLine = Object.assign({}, lifeLine, {
                                user: Object.assign({}, lifeLine.user, {
                                    image: `/static/avatars/${userName}.jpg`
                                })
                            });

                            result[id] = lifeLine;

                            return result;
                        }, {});

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
            getLoading,
            getPeople
        } = this;

        console.log({getPeople});

        return (
            <div ref={c => this.references.container = c}>
                <h1 className="header">Welcome {getUser.name}</h1>
                <h2 className="subheader">{getPeople.length} people are here to assist you!</h2>

                {getLoading || getList}
            </div>
        );
    }
}
