import { authHeader, config } from '../_helpers';

export const groupService = {
    getAll,
    create,
    apply,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/groups', requestOptions).then(handleResponse, handleError);
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/groups/' + id, requestOptions).then(handleResponse, handleError);
}

function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}
function create(group) {
    var headers = authHeader();
    headers['Content-Type']= 'application/json';
    const requestOptions = {
        method: 'POST',
        headers: headers ,
        body: JSON.stringify(group)
    };

    return fetch(config.apiUrl + '/groups/create', requestOptions).then(handleResponse, handleError);
}
function apply(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader() ,
    };

    return fetch(config.apiUrl + '/groups/apply/' + id, requestOptions).then(handleResponse, handleError);
}
function handleError(error) {
    return Promise.reject(error && error.message);
}