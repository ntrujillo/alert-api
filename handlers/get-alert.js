const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const TableName = 'cobis_alert';

function getAlert(enteId, alertId) {
    if (typeof alertId === 'undefined')
        return docClient.scan({
            TableName
        }).promise()
            .then(result => result.Items)

    return docClient.get({
        TableName,
        Key: {
            enteId,
            alertId
        }
    }).promise()
        .then(result => result.Item)
}

function getAlertByEnte(enteId) {
    console.log(`start getAlertByEnte: ${enteId}`)
    var queryExpression = {
        TableName,
        KeyConditionExpression: '#enteId = :enteId',
        FilterExpression: "#endDate > :today",
        ExpressionAttributeNames: { "#enteId": "enteId", '#endDate': 'endDate' },
        ExpressionAttributeValues: {
            ':enteId': enteId,
            ':today': new Date()
        }
    };
    return docClient.scan(queryExpression).promise()
        .then(result => {
            return result.Items;
        })
}
exports.getAlert = getAlert;
exports.getAlertByEnte = getAlertByEnte;