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
                                    <Link to="/login">Logowanie</Link>
                                </li>
                                <li className="nav-button">
                                    <Link to="/register">Rejestracja</Link>
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