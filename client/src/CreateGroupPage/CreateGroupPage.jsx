import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../_actions';
import {groupActions} from '../_actions';
import Navbar from "../Navbar/Navbar";

class CreateGroupPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            group: {
                limit: '',
                dateFrom: '',
                dateTo: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {group} = this.state;
        this.setState({
            group: {
                ...group,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({submitted: true});
        const {group} = this.state;
        const {dispatch} = this.props;
        if (group.limit && group.dateFrom && group.dateTo) {
            dispatch(groupActions.create(group));
        }
    }

    render() {
        const {registering} = this.props;
        const {group, submitted} = this.state;
        return (
            <div>
                <Navbar/>
                <div className="container padding-tb">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <h2>Dodawanie grupy</h2>
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !group.limit ? ' has-error' : '')}>
                                    <label htmlFor="firstName">Limit członków grupy</label>
                                    <input type="text" className="form-control" name="limit" value={group.limit}
                                           onChange={this.handleChange}/>
                                    {submitted && !group.limit &&
                                    <div className="help-block">Limit jest wymagany</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !group.dateFrom ? ' has-error' : '')}>
                                    <label htmlFor="dateFrom">Data rozpoczęcia</label>
                                    <input type="datetime-local" className="form-control" name="dateFrom"
                                           value={group.dateFrom}
                                           onChange={this.handleChange}/>
                                    {submitted && !group.dateFrom &&
                                    <div className="help-block">Data rozpoczęcia jest wymagana</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !group.dateTo ? ' has-error' : '')}>
                                    <label htmlFor="dateTo">Data zakończenia</label>
                                    <input type="datetime-local" className="form-control" name="dateTo"
                                           value={group.dateTo}
                                           onChange={this.handleChange}/>
                                    {submitted && !group.dateTo &&
                                    <div className="help-block">Data zakończenia jest wymagana</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary custom-btn">Stwórz</button>
                                    {registering &&
                                    <img
                                        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {registering} = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(CreateGroupPage);
export {connectedRegisterPage as CreateGroupPage};