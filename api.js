'use strict'

const Api = require('claudia-api-builder');
const api = new Api();
const { getAlert, getAlertByEnte } = require('./handlers/get-alert');
const createAlert = require('./handlers/create-alert');
const deleteAlert = require('./handlers/delete-alert');
const updateAlert = require('./handlers/update-alert');
const helloWorld = require('./handlers/hello-world');

api.get('/', () => 'Welcome to Alerts Api');
api.get('/alert', () => getAlert());
api.get('/{enteId}/alert', request => getAlertByEnte(request.pathParams.enteId), { error: 404 });
api.post('/{enteId}/alert', request => createAlert(request.pathParams.enteId,
    request.body), {
    success: 201,
    error: 400
});
api.put('/{enteId}/alert/{id}', request => updateAlert(request.pathParams.enteId,
    request.pathParams.id,
    request.body), {
    error: 400
});
api.delete('/{enteId}/alert/{id}', request => deleteAlert(request.pathParams.enteId,
    request.pathParams.id), {
    error: 400
});

api.get('/hello-world', request => helloWorld(request.body));
module.exports = api;