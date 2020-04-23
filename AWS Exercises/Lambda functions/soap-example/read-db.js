const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
    
    const email = event.email;
    
    const params = {
      TableName: "Customers", // The name of your DynamoDB table
      Key: { email } // They key of the item you wish to find.
    };
    
    try {
        const data = await documentClient.get(params).promise();
        
        callback(null, data.Item);
        
    } catch (e) {
        return {
            statusCode: 500,
            body: e
        };
    }
};
