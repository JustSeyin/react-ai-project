import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import Navbar from "../Navbar/Navbar";

class ListUsersPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        return (

            <div>
                <Navbar/>
                <div className="container padding-tb">
                    <div className="row">
                        <div className="col-12">
                            <h2>Lista grup</h2>
                            <table className="tcenter results-table p-15">
                                <tr>
                                    <th>Id</th>
                                    <th>Imię</th>
                                    <th>Nazwisko</th>
                                    <th>Usuń</th>
                                </tr>
                                {users.loading && <tr><td>Ładuje użytkowników...</td></tr>}
                                {users.error && <tr><td className="text-danger">ERROR: {users.error}</td></tr>}
                                {users.items &&
                                <tbody>
                                {users.items.map((user, index) =>
                                    <tr>
                                        <td>{user.isAdmin ? '[ADMIN] ' : ''  }{user.id}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        {
                                            user.deleting ? <td> Usuwam...</td>
                                                : user.deleteError ?
                                                <td className="text-danger"> - ERROR: {user.deleteError}</td>
                                                : <td><a href="" onClick={this.handleDeleteUser(user.id)}  className="dark-button custom-font">Usuń</a></td>

                                        }
                                    </tr>
                                )}
                                </tbody>
                                }
                            </table>
                            <small><b>Administratorzy</b> zostali wyróżnieni w tabeli.</small>

                            <p>
                                <Link to="/login">Wyloguj</Link>
                            </p>
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

const connectedListUserPage = connect(mapStateToProps)(ListUsersPage);
export { connectedListUserPage as ListUsersPage };