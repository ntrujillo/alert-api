'use strict'

const Api = require('claudia-api-builder');
const api = new Api();
const { getAlertByEnte } = require('./handlers/get-alert');
const createAlert = require('./handlers/create-alert');
const deleteAlert = require('./handlers/delete-alert');
const updateAlert = require('./handlers/update-alert');

api.get('/', () => 'Welcome to Alerts Api');
api.get('/{enteId}/alert', request => getAlertByEnte(request.pathParams.enteId), { error: 404 });
api.post('/{enteId}/alert', request => createAlert(request.pathParams.enteId,
    request.body), {
    success: 201,
    error: 400
});
api.put('/{enteId}/alert/{alertId}', request => updateAlert(request.pathParams.enteId,
    request.pathParams.alertId,
    request.body), {
    error: 400
});
api.delete('/{enteId}/alert/{alertId}', request => deleteAlert(request.pathParams.enteId,
    request.pathParams.alertId), {
    error: 400
});

module.exports = api;