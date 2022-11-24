const axios = require('axios');
const appRoot = require('app-root-path');
const duitkuConfig = require(`${appRoot}/config/duitku-configuration`);

module.exports = function requestTransaction(requestTransactionObj, cb){
    let passport = duitkuConfig.passport
    let url = 'https://passport.duitku.com/webapi/api/merchant/v2/inquiry';
    if(!passport) url = 'https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry';

    axios({
        method: 'POST',
        url: url,
        data: requestTransactionObj,
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