import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import Navbar from "../Navbar/Navbar";

class HomePage extends React.Component {
    render() {
        const { user, users } = this.props;
        return (
            <div>
                <Navbar/>
                <div className="container padding-tb">
                    <div className="row">
                        <div className="col-12">
                            <h1>Zalogowano jako {user.firstName}!</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };