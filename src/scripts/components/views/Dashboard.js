import React, {Component} from 'react';
import goto from '../../utilities/goto';
import store from '../../utilities/store';
// Components

export default class Dashboard extends Component {
    constructor() {
        super();

        this.references = {};
        this.state = {};
    }

    componentDidMount() {
        store.subscribe(state => {
            this.setState(state);
        });
    }

    get getList() {
        const {lifeLines} = this.state;

        if (!lifeLines || !lifeLines.length) {
            return null;
        }

        return (
            <div className="lifelinesGroup">
                <h2 className="lifelinesHeader">Coffee date</h2>
                <h3 className="lifelinesSubheader">3 people</h3>
                <ul className="lifelines">
                    {lifeLines.map((lifeLine, index) => (
                        <li
                            key={index}
                            className="lifeline">
                            {lifeLine.name}
                        </li>
                    ))}
                </ul>
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

    render() {
        const {
            getList,
            getUser
        } = this;

        console.log(this.state);

        return (
            <div ref={c => this.references.container = c}>
                <h1 className="header">Welcome {getUser.name}</h1>

                {getList}
            </div>
        );
    }
}
