const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid').v4;

const TableName = 'cobis_alert';

function createAlert(enteId, request) {
    if (!request || !request.label || !request.description)
        throw new Error('To send an alert enteId, label and description are required')

    return docClient.put({
        TableName,
        Item: {
            enteId: Number(enteId),
            alertId: uuid(),
            startDate: request.startDate,
            endDate: request.endDate,
            validPeriod: request.validPeriod,
            label: request.label,
            description: request.description,
            receiver: request.receiver,
            readed: request.readed,
            alertType: request.alertType,
            alertPriority: request.alertPriority
        }
    }).promise()
        .then((res) => {
            console.log('Alert is saved!', res)
            return res
        })
        .catch((saveError) => {
            console.log(`Oops, alert is not saved :(`, saveError)
            throw saveError
        })
}

module.exports = createAlert