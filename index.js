// CONFIG EXAMPLE */
// const duitkuConfig = {
//     merchantCode : "DXXXX",
//     apiKey : "XXXc6XXX31829bXXX74cd5XXXXX869XX",
//     passport : true,
//     callbackUrl : "https://example/route/callback",
//     returnUrl : "https://example/route/return",
//     expiryPeriod: 1440
// };
// module.exports = duitkuConfig;
// merchantCode = Your Project Code ID From Duitku Dashboard
// apiKey = String of API Key
// passport = A boolean value that will execute which environtment you would like to use.
// callbackUrl = An URL for you receive notification payment from Duitku server.
// returnUrl = An URL for landing page after user redirect from payment confirmation page.
// expiryPeriod = An Integer used for set how long expiry period for virtual account number or retail number.

/**HOW TO USE METHOD REQUEST TRANSACTION
* requestTransactionObj = An Object data for request to the API 
* cb = A javascript callback function to catch response data from API */
const requestTransaction = require('./api/requestTransaction.js')

/**HOW TO USE METHOD CHECK TRANSACTION
* merchantOrderId = A string of your transaction that have been generated on Duitku side, for you to check the transaction status.
* cb = A javascript callback function to catch response data from API */
const checkTransaction = require('./api/checkTransaction.js')

/**HOW TO USE METHOD GET PAYMENT METHOD
* amount = A Number variable, required because it would be check the payment fee 
* cb = A javascript callback function to catch response data from API */
const getPaymentMethod = require('./api/getPaymentMethod.js')

/**HOW TO USE METHOD CREATE INFVOICE
* createInvoiceObj = An Object data for request to the API 
* cb = A javascript callback function to catch response data from API */
const createInvoice = require('./api/createInvoice.js')

/**HOW TO USE METHOD CALLBACK
* request = A string data from callback notification to check signature 
* return object JSON*/
const callback = require('./api/callback.js')

// OBJECT INSTANCE
/** REQUEST TRANSACTION CONSTRUCTOR, , , 
 * "paymentAmount": 10000,
 * "paymentMethod": "sample string",
 * "merchantOrderId": "sample string",
 * "productDetails": "sample string",
 */
const Transaction = require('./model/Transaction.js')

/** CREATE INVOICE CONSTRUCTOR, , , 
 * "paymentAmount": 10000,
 * "merchantOrderId": "sample string",
 * "productDetails": "sample string",
 */
const Invoice = require('./model/Invoice.js')

/** CREATE ITEM DETAIL, , , 
 * "price": 10000,
 * "name": "sample string",
 * "qty": 1,
 */
const ItemDetail = require('./model/itemDetail.js')

const duitku = {
    requestTransaction,
    checkTransaction,
    getPaymentMethod,
    createInvoice,
    callback,
    Transaction,
    Invoice,
    ItemDetail
}
module.exports = duitku;