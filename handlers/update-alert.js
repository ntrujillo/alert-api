const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

function updateAlert(enteId, alertId, options) {
    if (!options)
        throw new Error('Body is required')

    return docClient.update({
        TableName: 'alert',
        Key: {
            enteId: Number(enteId),
            alertId: alertId
        },
        UpdateExpression: 'set readed=:re',
        ExpressionAttributeValues: {
            ':re': options.readed || false,
        },
        ReturnValues: 'ALL_NEW'
    }).promise()
        .then((result) => {
            console.log('Alert is updated!', result)
            return result.Attributes
        })
        .catch((updateError) => {
            console.log(`Oops, alert is not updated :(`, updateError)
            throw updateError
        })
}

module.exports = updateAlert
