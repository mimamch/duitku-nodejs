const crypto = require('crypto-js');
const axios = require('axios');
const appRoot = require('app-root-path');
const duitkuConfig = require(`${appRoot}/config/duitku-configuration`);

module.exports = function checkTransaction(merchantOrderId, cb){
    if(typeof merchantOrderId != "string" && typeof merchantOrderId != "number") {
        throw new Error("Your Order Id data type isn't a string or number")
    }
    let passport = duitkuConfig.passport;
    let data = {
        merchantCode: duitkuConfig.merchantCode,
        merchantOrderId
    }
    let signature = `${duitkuConfig.merchantCode}${merchantOrderId}${duitkuConfig.apiKey}`
    let url = 'https://passport.duitku.com/webapi/api/merchant/transactionStatus';
    if(!passport) url = 'https://sandbox.duitku.com/webapi/api/merchant/transactionStatus';
    data.signature = crypto.MD5(signature).toString();

    axios({
        method: 'POST',
        url: url,
        data: data,
        headers: {
                    "Content-type" : "application/json; charset=UTF-8"
                }
    })
    .then(response => cb(response.data))
    .catch(err =>{
        let errorJson = {
            error: err.code,
            status: err.response.status,
            statusMessage: err.response.statusText,
            reason: err.response.data.Message,
        }
        cb({}, errorJson)
    })
}