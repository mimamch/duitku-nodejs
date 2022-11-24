const crypto = require('crypto-js');
const appRoot = require('app-root-path');
const duitkuConfig = require(`${appRoot}/config/duitku-configuration`);
const CustomerDetail = require('./CustomerDetail.js')
const requestTransaction = require('../api/requestTransaction.js')
const ItemDetail = require('./ItemDetail.js')
const { 
    validatorNumber, 
    validatorEmail, 
    validatorPercentage, 
    validatorString, 
    validatorPhoneNumber
 } = require('../helper/objectValidator.js');

class Transaction{

    //private declaration
    #merchantCode;
    #paymentAmount;
    #paymentMethod;
    #merchantOrderId;
    #productDetails;
    #additionalParam;
    #merchantUserInfo;
    #customerVaName;
    #email;
    #phoneNumber;
    #itemDetails;
    #customerDetail;
    #callbackUrl = "";
    #returnUrl = "";
    #signature;
    #expiryPeriod;
    #discountDetails = [];
    #taxDetails = [];
    #finalItemDetails = [];

    constructor(paymentAmount, paymentMethod, merchantOrderId, productDetails){
        this.#merchantCode = duitkuConfig.merchantCode,
        this.#paymentAmount = validatorNumber(paymentAmount, "paymentAmount"),
        this.#paymentMethod = validatorString(paymentMethod, "paymentMethod"),
        this.#merchantOrderId = validatorString(merchantOrderId, "merchantOrderId"),
        this.#productDetails = validatorString(productDetails, "productDetails"),
        this.#additionalParam = "",
        this.#merchantUserInfo = "",
        this.#customerVaName = "",
        this.#email = "",
        this.#phoneNumber = "",
        this.#itemDetails = [],
        this.#customerDetail = new CustomerDetail(),
        this.#callbackUrl = duitkuConfig.callbackUrl,
        this.#returnUrl = duitkuConfig.returnUrl,
        this.#signature = crypto.MD5(`${duitkuConfig.merchantCode}${merchantOrderId}${paymentAmount}${duitkuConfig.apiKey}`).toString(),
        this.#expiryPeriod = validatorNumber(duitkuConfig.expiryPeriod)
    }

    get(){
        this.#getFinalCount()
        return {
            merchantCode: this.getMerchantCode(),
            paymentAmount: this.getPaymentAmount(),
            paymentMethod: this.getPaymentMethod(),
            merchantOrderId: this.getMerchantOrderId(),
            productDetails: this.getProductDetails(),
            additionalParam: this.getAdditionalParam(),
            merchantUserInfo: this.getMerchantUserInfo(),
            customerVaName: this.getCustomerVaName(),
            email: this.getEmail(),
            phoneNumber: this.getPhoneNumber(),
            itemDetails: this.#getFinalItemDetails(),
            customerDetail: this.getCustomerDetail().get(),
            callbackUrl: this.getCallbackUrl(),
            returnUrl: this.getReturnUrl(),
            signature: this.getSignature(),
            expiryPeriod: this.getExpiryPeriod(),
        }
    }

    getMerchantCode(){
        return this.#merchantCode
    }

    getPaymentAmount(){
        return this.#paymentAmount
    }

    getPaymentMethod(){
        return this.#paymentMethod
    }

    getMerchantOrderId(){
        return this.#merchantOrderId
    }

    getProductDetails(){
        return this.#productDetails
    }

    getAdditionalParam(){
        return this.#additionalParam
    }

    getMerchantUserInfo(){
        return this.#merchantUserInfo
    }

    getCustomerVaName(){
        return this.#customerVaName
    }

    getEmail(){
        return this.#email
    }

    getPhoneNumber(){
        return this.#phoneNumber
    }

    getItemDetails(){
        return this.#itemDetails
    }

    getCustomerDetail(){
        return this.#customerDetail
    }

    getCallbackUrl(){
        return this.#callbackUrl
    }

    getReturnUrl(){
        return this.#returnUrl
    }
    
    getSignature(){
        return this.#signature
    }

    getExpiryPeriod(){
        return this.#expiryPeriod
    }

    getDiscount(){
        return this.#discountDetails
    }

    getTax(){
        return this.#taxDetails
    }

    #getFinalItemDetails(){
        return this.#finalItemDetails
    }

    setPaymentMethod(paymentMethod){
        validatorString(paymentMethod, "paymentMethod")
        this.#paymentMethod = paymentMethod
    }

    setPaymentAmount(paymentAmount){
        validatorNumber(paymentAmount, "paymentAmount")
        this.clearDiscount();
        this.clearItemDetails();
        this.clearTax();
        this.#paymentAmount = paymentAmount
        this.#setSignature()
        // this.#signature = crypto.MD5(`${duitkuConfig.merchantCode}${this.getMerchantOrderId}${paymentAmount}${duitkuConfig.apiKey}`).toString()
    }

    setMerchantOrderId(merchantOrderId){
        validatorString(merchantOrderId, "merchantOrderId")
        this.#merchantOrderId = merchantOrderId
        this.#setSignature()
        // this.#signature = crypto.MD5(`${duitkuConfig.merchantCode}${merchantOrderId}${this.getPaymentAmount}${duitkuConfig.apiKey}`).toString()
    }

    setProductDetails(productDetails){
        validatorString(productDetails, "productDetails")
        this.#productDetails = productDetails
    }

    setAdditionalParam(additionalParam){
        validatorString(additionalParam, "additionalParam")
        this.#additionalParam = additionalParam
    }

    setMerchantUserInfo(merchantUserInfo){
        validatorString(merchantUserInfo, "merchantUserInfo")
        this.#merchantUserInfo = merchantUserInfo
    }

    setCustomerVaName(customerVaName){
        validatorString(customerVaName, "customerVaName")
        this.#customerVaName = customerVaName
    }

    setEmail(email){
        validatorEmail(email)
        this.#email = email
    }

    setPhoneNumber(phoneNumber){
        validatorPhoneNumber(phoneNumber)
        this.#phoneNumber = phoneNumber
    }

    #setSignature(){
        this.#signature = crypto.MD5(`${duitkuConfig.merchantCode}${this.getMerchantOrderId()}${this.getPaymentAmount()}${duitkuConfig.apiKey}`).toString()
    }

    #counterItemDetail(){
        let total = 0
        this.#itemDetails.map(item => {
            total = total + item.price
        })
        this.#paymentAmount = (total)
        this.#setSignature()
    }

    #getFinalCount(){
        if(this.#itemDetails.length > 0){
            let total = 0
            let final = this.#itemDetails.concat(this.#discountDetails, this.#taxDetails)
            final.map(item => {
                total = total + item.price
            })
            this.#paymentAmount = (total)
            this.#finalItemDetails = final
            this.#setSignature()
        }
    }

    addItemDetails(itemDetail){
        this.#itemDetails.push(itemDetail)
        this.#counterItemDetail()
    }

    createAnItemDetail(name, qty, price){
        let itemDetail = new ItemDetail(name, qty, price)
        this.addItemDetails(itemDetail.get())
    }

    createDiscount(percentage, discountString = "Discount"){
        validatorNumber(percentage)
        validatorString(discountString, "discountString")
        validatorPercentage(percentage)
        let price = (this.getPaymentAmount() * percentage) / 100
        let itemDetail = new ItemDetail(discountString, 1, -price)
        this.#discountDetails.push(itemDetail.get());
    }

    createTax(percentage, taxString = "Tax"){
        validatorNumber(percentage)
        validatorString(taxString, "taxString")
        validatorPercentage(percentage)
        let price = (this.getPaymentAmount() * percentage) / 100
        let itemDetail = new ItemDetail(taxString, 1, price)
        this.#taxDetails.push(itemDetail.get())
    }

    removeItemDetails(index){
        this.#itemDetails.splice(index, 1)
        this.#counterItemDetail()
    }

    removeDiscount(index){
        this.#discountDetails.splice(index, 1)
        this.#counterItemDetail()
    }

    removeTax(index){
        this.#taxDetails.splice(index, 1)
        this.#counterItemDetail()
    }
    
    clearItemDetails(){
        this.#itemDetails = []
        this.#counterItemDetail()
    }

    clearDiscount(){
        this.#discountDetails = []
        this.#counterItemDetail()
    }

    clearTax(){
        this.#taxDetails = []
        this.#counterItemDetail()
    }

    setCallbackUrl(callbackUrl){
        validatorString(callbackUrl)
        this.#callbackUrl = callbackUrl
    }

    setReturnUrl(returnUrl){
        validatorString(returnUrl)
        this.#returnUrl = returnUrl
    }

    setExpiryPeriod(expiryPeriod){
        validatorNumber(expiryPeriod)
        this.#expiryPeriod = expiryPeriod
    }

    request(cb){
        requestTransaction(this.get(), cb)
    }
}

module.exports = Transaction;