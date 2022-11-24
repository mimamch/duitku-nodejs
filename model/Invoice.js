const appRoot = require('app-root-path');
const duitkuConfig = require(`${appRoot}/config/duitku-configuration`);
const CustomerDetail = require('./CustomerDetail.js')
const ItemDetail = require('./ItemDetail.js')
const createInvoice = require('../api/createInvoice.js')
const { 
    validatorNumber, 
    validatorEmail, 
    validatorPercentage, 
    validatorString, 
    validatorPhoneNumber
 } = require('../helper/objectValidator.js');

class Invoice{
    #paymentAmount;
    #merchantOrderId;
    #productDetails;
    #email;
    #additionalParam;
    #merchantUserInfo;
    #customerVaName;
    #phoneNumber;
    #itemDetails;
    #customerDetail;
    #returnUrl;
    #callbackUrl;
    #expiryPeriod;
    #paymentMethod;
    #discountDetails = [];
    #taxDetails = [];
    #finalItemDetails = [];

    constructor (paymentAmount, merchantOrderId, productDetails){
        this.#paymentAmount = paymentAmount,
        this.#merchantOrderId = merchantOrderId,
        this.#productDetails = productDetails,
        this.#email = "",
        this.#additionalParam = "",
        this.#merchantUserInfo = "",
        this.#customerVaName = "",
        this.#phoneNumber = "",
        this.#itemDetails = [],
        this.#customerDetail = new CustomerDetail(),
        this.#returnUrl = duitkuConfig.returnUrl,
        this.#callbackUrl = duitkuConfig.callbackUrl,
        this.#expiryPeriod = duitkuConfig.expiryPeriod,
        this.#paymentMethod = ""
    }

    get(){
        this.#getFinalCount()
        let obj = {
            paymentAmount: this.getPaymentAmount(),
            merchantOrderId: this.getMerchantOrderId(),
            productDetails: this.getProductDetails(),
            email: this.getEmail(),
            additionalParam: this.getAdditionalParam(),
            merchantUserInfo: this.getMerchantUserInfo(),
            customerVaName: this.getCustomerVaName(),
            phoneNumber: this.getPhoneNumber(),
            itemDetails: this.#getFinalItemDetails(),
            customerDetail: this.getCustomerDetail().get(),
            returnUrl: this.getReturnUrl(),
            callbackUrl: this.getCallbackUrl(),
            expiryPeriod: this.getExpiryPeriod()
        }
        if(this.getPaymentMethod() != ""){
            obj.paymentMethod = this.getPaymentMethod()
        }
        return obj
    }

    getPaymentAmount(){
        return this.#paymentAmount;
    }

    getMerchantOrderId(){
        return this.#merchantOrderId;
    }

    getProductDetails(){
        return this.#productDetails;
    }

    getEmail(){
        return this.#email;
    }

    getAdditionalParam(){
        return this.#additionalParam;
    }

    getMerchantUserInfo(){
        return this.#merchantUserInfo;
    }

    getCustomerVaName(){
        return this.#customerVaName;
    }

    getPhoneNumber(){
        return this.#phoneNumber;
    }

    getItemDetails(){
        return this.#itemDetails;
    }

    getCustomerDetail(){
        return this.#customerDetail;
    }

    getReturnUrl(){
        return this.#returnUrl;
    }

    getCallbackUrl(){
        return this.#callbackUrl;
    }

    getExpiryPeriod(){
        return this.#expiryPeriod;
    }

    getPaymentMethod(){
        return this.#paymentMethod;
    }

    #getFinalItemDetails(){
        return this.#finalItemDetails
    }

    setPaymentAmount(paymentAmount){
        validatorNumber(paymentAmount, "paymentAmount")
        this.clearDiscount();
        this.clearItemDetails();
        this.clearTax();
        this.#paymentAmount = paymentAmount;
    }

    setMerchantOrderId(merchantOrderId){
        validatorString(merchantOrderId, "merchantOrderId");
        this.#merchantOrderId = merchantOrderId;
    }

    setProductDetails(productDetails){
        validatorString(productDetails, "productDetails");
        this.#productDetails = productDetails;
    }

    setEmail(email){
        validatorEmail(email);
        this.#email = email;
    }

    setAdditionalParam(additionalParam){
        validatorString(additionalParam, "additionalParam");
        this.#additionalParam = additionalParam;
    }

    setMerchantUserInfo(merchantUserInfo){
        validatorString(merchantUserInfo, "merchantUserInfo");
        this.#merchantUserInfo = merchantUserInfo;
    }

    setCustomerVaName(customerVaName){
        validatorString(customerVaName, "customerVaName");
        this.#customerVaName = customerVaName;
    }

    setPhoneNumber(phoneNumber){
        validatorPhoneNumber(phoneNumber);
        this.#phoneNumber = phoneNumber;
    }

    #counterItemDetail(){
        let total = 0
        this.#itemDetails.map(item => {
            total = total + item.price
        })
        this.#paymentAmount = (total)
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
        let itemDetail = new ItemDetail(discountSring, 1, -price)
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


    create(cb){
        createInvoice(this.get(), cb)
    }
}

module.exports = Invoice;