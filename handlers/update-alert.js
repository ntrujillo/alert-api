const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const TableName = 'cobis_alert';

function updateAlert(enteId, alertId, options) {
    if (!options)
        throw new Error('Body is required')

    return docClient.update({
        TableName,
        Key: { enteId, alertId },
        UpdateExpression: 'set readed=:readed',
        ExpressionAttributeValues: {
            ':readed': options.readed,
        },
        ReturnValues: 'UPDATED_NEW'
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
