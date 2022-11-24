test("Check Transaction", (done) => {
    const appRoot = require('app-root-path');
    const duitkuConfig = require(`${appRoot}/config/duitku-configuration`);
    const {
        checkTransaction
        } = require('../index.js');
    
    checkTransaction("test_payment_01", (resp, error) => {
        if (error) {
            done(error);
            return
        }
        try{
            expect(resp).toEqual(expect.objectContaining({
                "merchantOrderId": expect.any(String),
                "reference": expect.any(String),
                "amount": expect.any(String),
                "statusCode": expect.any(String),
                "statusMessage": expect.any(String)
            }))
            expect(resp.merchantOrderId).toMatch("test_payment_01")
            expect(resp.reference).toContain(duitkuConfig.merchantCode)
            done()
        } catch (error){
            done(error)
        }
    })
})