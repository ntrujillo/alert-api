const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const TableName = 'cobis_alert';

function deleteAlert(enteId, alertId) {
    return docClient.delete({
        TableName,
        Key: {
            enteId: Number(enteId),
            alertId: alertId
        }
    }).promise()
        .then((result) => {
            console.log('Alert is deleted!', result)
            return result
        })
        .catch((deleteError) => {
            console.log(`Oops, alert is not deleted :(`, deleteError)
            throw deleteError
        })
}

module.exports = deleteAlert
