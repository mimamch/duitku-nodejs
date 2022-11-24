
//validator start
function validatorNumber(value, key){
    if(typeof value != "number") throw new Error(`Invalid key ${key} is not number!`)
    return value;
}

function validatorString(value, key){
    if(typeof value != "string") throw new Error(`Invalid key ${key} is not string!`)
    return value;
}

function validatorEmail(param){
    const emailRegexp = /([-z0-9.]*@[a-z0-9]*[.][a-z]*)\w+/g;
    if(!emailRegexp.test(param)) throw new Error("Invalid Email Addresses")
    return param;
}

function validatorPhoneNumber(param){
    const phoneRegexp = /([0-9+]{7,16})\w+/g;
    if(!phoneRegexp.test(param)) throw new Error("Invalid Phone Number")
    return param;
}

function validatorPercentage(param){
    param = validatorNumber(param)
    if(param > 100){
        throw new Error("percentage cannot more than 100")
    }
    if(param < 1){
        throw new Error("percentage cannot less than 1")
    }
    return param;
}
//validator end

module.exports = {
    validatorString,
    validatorNumber,
    validatorEmail,
    validatorPercentage,
    validatorPhoneNumber
}