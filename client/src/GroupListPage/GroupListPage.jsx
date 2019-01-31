import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Navbar from "../Navbar/Navbar";
import {groupActions} from "../_actions/group.actions";

class GroupListPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(groupActions.getAll());
    }

    handleDeleteGroup(id) {
        return (e) => this.props.dispatch(groupActions.delete(id));
    }

    handleJoinGroup(id) {
        return (e) => this.props.dispatch(groupActions.apply(id));
    }

    render() {
        const {group, groups} = this.props;
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
                                    <th>Liczba miesc</th>
                                    <th>Rozpoczęcie zajęć</th>
                                    <th>Zakończenie zajęć</th>
                                    <th>Złóż wniosek o dołączenie</th>
                                    <th>Usuń grupę</th>
                                </tr>
                                    {groups.loading && <tr><td>Ładuje grupy...</td></tr>}
                                    {groups.error && <tr><td className="text-danger">ERROR: {groups.error}</td></tr>}
                                    {groups.items &&
                                        <tbody>
                                        {groups.items.map((group, index) =>
                                            <tr>
                                            <td>{group.id}</td>
                                            <td>{group.limit}</td>
                                            <td>{group.dateFrom}</td>
                                            <td>{group.dateTo}</td>
                                            <td><a href="" onClick={this.handleJoinGroup(group.id)} className="dark-button custom-font">Dołącz</a></td>
                                                {
                                                    group.deleting ? <td> Usuwam...</td>
                                                        : group.deleteError ?
                                                        <td className="text-danger"> - ERROR: {group.deleteError}</td>
                                                        : <td><a href="" onClick={this.handleDeleteGroup(group.id)}  className="dark-button custom-font">Usuń</a></td>

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

const connectedGroupListPage = connect(mapStateToProps)(GroupListPage);
export {connectedGroupListPage as GroupListPage};