const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

function getAlert(alertId) {
    if (typeof alertId === 'undefined')
        return docClient.scan({
            TableName: 'alert'
        }).promise()
            .then(result => result.Items)

    return docClient.get({
        TableName: 'alert',
        Key: {
            alertId: alertId
        }
    }).promise()
        .then(result => result.Item)
}

function getAlertByEnte(enteId) {
    console.log(`start getAlertByEnte: ${enteId}`)
    return docClient.scan({
        ExpressionAttributeNames: { "#enteId": "enteId", '#status': 'status' },
        ExpressionAttributeValues: { ":enteId": Number(enteId), ':status': 'OPEN' },
        FilterExpression: "#enteId = :enteId AND #status = :status",
        TableName: 'alert'
    }).promise()
        .then(result => {
            return result.Items;
        })
}
exports.getAlert = getAlert;
exports.getAlertByEnte = getAlertByEnte;