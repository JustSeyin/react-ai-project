import {groupConstants, userConstants} from '../_constants';
import {requestService} from '../_services';
import { history } from '../_helpers';
import {alertActions} from "./alert.actions";

export const requestActions = {
    getAll,
    delete: _delete
};


function getAll() {
    return dispatch => {
        dispatch(request());

        requestService.getAll()
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

        requestService.delete(id)
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