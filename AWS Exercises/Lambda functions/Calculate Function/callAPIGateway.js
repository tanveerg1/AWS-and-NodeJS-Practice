var https = require('https');
const options = {
    host: 'jqebe5qcrh.execute-api.us-east-2.amazonaws.com',
    port: 443,
    path: '/prod/calc?num1=5&num2=3&operationType=multiply',
    method: 'GET',
    headers: {
        'x-api-key': 'YOUR_API_KEY'
    }
};

//process.env.VPCE_DNS_NAME

exports.handler = (event, context, callback) => {
    // TODO implement
    
    const req = https.request(options, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
        
        let data = '';
        res.on('data', (d) => {
            data += d;
            process.stdout.write(d);
        });
        
        res.on('end', () => {
            callback(null, JSON.parse(data));
        });
        //res.on();
    });
    
    req.on('error', (e) => {
        console.log(e);
        callback(null, e);
    });
    
    req.end();

    
    //return req;
};
