import React from 'react';
import {Link} from 'react-router-dom'

class Navbar extends React.Component {
    render() {
        return (
            <div className="bg-darkblue">
                <div className="container">
                    <div className="row header">
                        <div className="col-4 logo" >
                            <Link to="/"> <span className="logo-1">Simple</span><span
                                className="logo-2">.med</span></Link>
                        </div>
                        <div className="col-8">
                            <ul>
                                <li>
                                    <Link to="/group_create">Stwórz grupę</Link>
                                </li>
                                <li>
                                    <Link to="/group_list">Lista grup</Link>
                                </li>
                                <li>
                                    <Link to="/request_status">Status wniosków</Link>
                                </li>
                                <li>
                                    <Link to="/list_users">Lista użytkowników</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;