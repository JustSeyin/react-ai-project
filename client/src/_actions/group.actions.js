import {groupConstants, userConstants} from '../_constants';
import {groupService, userService} from '../_services';
import { history } from '../_helpers';
import {alertActions} from "./alert.actions";

export const groupActions = {
    getAll,
    create,
    apply,
    delete: _delete
};


function getAll() {
    return dispatch => {
        dispatch(request());

        groupService.getAll()
            .then(
                groups => dispatch(success(groups)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: groupConstants.GETALL_REQUEST } }
    function success(groups) { return { type: groupConstants.GETALL_SUCCESS, groups } }
    function failure(error) { return { type: groupConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        groupService.delete(id)
            .then(
                () => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: groupConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: groupConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: groupConstants.DELETE_FAILURE, id, error } }
}
function create(group) {
    return dispatch => {
        dispatch(request(group));

        groupService.create(group)
            .then(
                () => {
                    dispatch(success());
                    dispatch(alertActions.success('Pomyślnie utworzono grupę'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: groupConstants.CREATE_REQUEST, user } }
    function success(user) { return { type: groupConstants.CREATE_SUCCESS, user } }
    function failure(error) { return { type: groupConstants.CREATE_FAILURE, error } }
}
function apply(group) {
    return dispatch => {
        dispatch(request(group));

        groupService.apply(group)
            .then(
                () => {
                    dispatch(success());
                    dispatch(alertActions.success('Pomyślnie aplikowano do grupy'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: groupConstants.CREATE_REQUEST, user } }
    function success(user) { return { type: groupConstants.CREATE_SUCCESS, user } }
    function failure(error) { return { type: groupConstants.CREATE_FAILURE, error } }
}