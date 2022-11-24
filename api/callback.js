const crypto = require('crypto-js');
const appRoot = require('app-root-path');
const duitkuConfig = require(`${appRoot}/config/duitku-configuration`);

module.exports = function callback(request){
    if (!request) {
        throw new Exception('Access denied');
    }

    if(typeof request == "string") {
        request = JSON.parse(request)
    }

    if(!request.merchantCode || !request.amount || !request.merchantOrderId || request.signature){
        throw new Error("Bad Parameter")
    }

    if(request.signature != crypto.MD5(`${duitkuConfig.merchantCode}${callback.amount}${callback.merchantOrderId}${duitkuConfig.apiKey}`).toString()){
        throw new Error("Wrong Signature")
    }

    return request;
}