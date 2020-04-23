const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const {
    pathParameters: { id }
  } = event;
  const { title } = JSON.parse(event.body);
  const params = {
    TableName: "articles",
    Item: {
      id: id,
      title: title
    }
  };
  try {
    //console.log(title);
    const data = await documentClient.putItem(params).promise();
    const response = {
      statusCode: 200
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500
    };
  }
};