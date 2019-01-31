import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Navbar from "../Navbar/Navbar";
import {requestActions} from "../_actions";

class RequestStatusPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(requestActions.getAll());
    }

    handleDeleteRequest(id) {
        return (e) => this.props.dispatch(requestActions.delete(id));
    }

    render() {
        const {group, groups} = this.props;
        const requestTable = { 0 : 'W trakcie rozpatrywania', 1 : 'Rozpatrzony pozytywnie'}
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
                                    <th>Status wniosku</th>
                                    <th>Usuń wniosek</th>
                                </tr>
                                {groups.loading && <tr><td>Ładuje wnioski...</td></tr>}
                                {groups.error && <tr><td className="text-danger">ERROR: {groups.error}</td></tr>}
                                {groups.items &&
                                <tbody>
                                {groups.items.map((group, index) =>
                                    <tr>
                                        <td>{group.id}</td>
                                        <td>{group.user.firstName}</td>
                                        <td>{group.user.lastName}</td>
                                        <td>{requestTable[group.stateId]}</td>
                                        {
                                            group.deleting ? <td> Usuwam...</td>
                                                : group.deleteError ?
                                                <td className="text-danger"> - ERROR: {group.deleteError}</td>
                                                : <td><a href="" onClick={this.handleDeleteRequest(group.id)}  className="dark-button custom-font">Usuń</a></td>

                                        }
                                    </tr>
                                )}
                                </tbody>
                                }
                            </table>
                            <small>Listę złożonych wniosków można sprawdzić na sąsiedniej podstronie.</small>

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
    const {groups, authentication} = state;
    const {group} = authentication;
    return {
        group,
        groups
    };
}

const connectedRequestStatusPage = connect(mapStateToProps)(RequestStatusPage);
export {connectedRequestStatusPage as RequestStatusPage};