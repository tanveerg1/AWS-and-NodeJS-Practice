const AWS = require("aws-sdk");
const crypto = require("crypto");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

var generateRandomString = function(length){
  return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
};

var sha512 = function(password, salt){
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  var value = hash.digest('hex');
  return value;
};


exports.handler = async (event, context, cb) => {
  //console.log(event);
  //const { email, username, password, confirmPassword } = JSON.parse(event.body);
  const email = event.email;
  const username = event.username;
  const password = event.password;
  const confirmPassword = event.confirmPassword;
  
  var salt = generateRandomString(16);
  var hash = sha512(password, salt);
  
  const params = {
    TableName: "Customers", // The name of your DynamoDB table
    Item: { 
      email: email,
      username: username,
      password: hash,
      salt: salt
    }
  };
  
  try {
    
    if(password == confirmPassword){
      const data = await documentClient.put(params).promise();
      const response = {
        statusCode: 200
      };
      return response; // Returning a 200 if the item has been inserted 
    }else {
      return false;
    }
    
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
};
