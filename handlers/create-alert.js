const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid').v4;

function createAlert(enteId, request) {
    if (!request || !request.label || !request.description)
        throw new Error('To send an alert enteId, label and description are required')

    return docClient.put({
        TableName: 'alert',
        Item: {
            enteId: Number(enteId),
            alertId: uuid(),
            icon: request.icon,
            type: request.type,
            label: request.label,
            description: request.description,
            date: request.date,
            readed: request.readed,
            priority: request.priority,
            period: request.period,
            status: 'OPEN'
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