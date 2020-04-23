
exports.handler = async (event) => {
    // TODO implement
    
    var res = {};
    res.num1 = Number(event.num1);
    res.num2 = Number(event.num2);
    res.operationType = event.operationType;
    
    switch (event.operationType) {
        case 'add':
            res.result = res.num1 + res.num2;
            break;
        case 'sub':
            res.result = res.num1 - res.num2;
            break;
        case 'multiply':
            res.result = res.num1 * res.num2;
            break;
        case 'divide':
            res.result = res.num2===0 ? NaN : Number(event.num1) / Number(event.num2);
            break;
        default:
            return {
                body: console.log("Invalid")
            };
            break;
    }
    
    return res;
    
};
