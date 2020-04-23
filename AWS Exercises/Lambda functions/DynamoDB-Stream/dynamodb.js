const AWS = require("aws-sdk");
AWS.config.update({ region: 'us-east-1' });
const ses = new AWS.SES();

// Initialising the DynamoDB SDK
//const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    // TODO implement
    //console.log(JSON.stringify(event, null, 2));
       
    var emailTo ='';
    event.Records.forEach((record)=> {
      //console.log('Stream record: ', JSON.stringify(record, null, 2));
            
        if(record.eventName == 'INSERT'){
          emailTo = record.dynamodb.NewImage.email.S;
        }
    });
    
    console.log(emailTo);
    
        const htmlBody = `
                  <!DOCTYPE html>
                    <html>
                      <head>
                      </head>
                      <body>
                        <p>Hi,</p>
                        <p>...</p>
                      </body>
                    </html>
                `;
                const textBody = 
                    `Hi,
                    ...
                `;
                
                const params = {
                    Destination: {
                      ToAddresses: [emailTo]
                    },
                    Message: {
                      Body: {
                        Html: {
                          Charset: "UTF-8",
                          Data: htmlBody
                        },
                        Text: {
                          Charset: "UTF-8",
                          Data: textBody
                        }
                      },
                      Subject: {
                        Charset: "UTF-8",
                        Data: "Thanks for registering with ACME!"
                      }
                    },
                    Source: 'anyemail@email.com'
                };
                
                await ses.sendEmail(params).promise().then(data => {
                  console.log(data.messageId);
                }).catch(err => {
                  console.log(err);
                });
                
                //console.log(response);
};
