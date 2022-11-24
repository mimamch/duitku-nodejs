const crypto = require('crypto-js');
const axios = require('axios');
const dateFormat = require('../helper/dateFormat.js');
const appRoot = require('app-root-path');
const duitkuConfig = require(`${appRoot}/config/duitku-configuration`);

module.exports = function getPaymentMethod(amount, cb){
    if(typeof amount != "number") {
        throw new Error("Amount should be a Number")
    }
    let passport = duitkuConfig.passport;
    let date = new Date();
    let data = {
        merchantCode: duitkuConfig.merchantCode,
        datetime: dateFormat(date),
        amount
    }
    let signature = `${data.merchantCode}${data.amount}${data.datetime}${duitkuConfig.apiKey}`
    let url = 'https://passport.duitku.com/webapi/api/merchant/paymentmethod/getpaymentmethod';
    if(!passport) url = 'https://sandbox.duitku.com/webapi/api/merchant/paymentmethod/getpaymentmethod';
    data.signature = crypto.SHA256(signature).toString();
    
    axios({
        method: 'POST',
        url: url,
        data: data,
        headers: {
                    "Content-type" : "application/json; charset=UTF-8"
                }
    })
    .then(response => cb(response.data.paymentFee))
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