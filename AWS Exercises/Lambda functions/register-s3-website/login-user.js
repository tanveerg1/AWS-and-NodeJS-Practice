const AWS = require("aws-sdk");
const crypto = require("crypto");
const documentClient = new AWS.DynamoDB.DocumentClient();

var sha512 = function(password, salt){
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  var value = hash.digest('hex');
  return value;
};


exports.handler = async event => {

  const email = event.email;
  const password = event.password;
  const params = {
    TableName: "Customers", // The name of your DynamoDB table
    Key: { email } // They key of the item you wish to find.
  };
  
  try {
    // Utilising the get method to retrieve an indvidual item 
    const data = await documentClient.get(params).promise();
    
    //console.log(data.Item['salt']);
    var hash = sha512(password, data.Item['salt']);
    //console.log(hash);
    
    if(data.Item['email'] == email && data.Item['password'] == hash) {
      const response = {
        statusCode: 200,
        headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: data.Item
      };
      return response;
    }else {
      return {
        statusCode: 500,
        body: "Wrong password"
      };
    }
   
  } catch (e) {
    return {
      statusCode: 500,
      body: e
    };
  }
};