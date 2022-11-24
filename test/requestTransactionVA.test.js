test('Request transaction VA', done => {
    const appRoot = require('app-root-path');
    const duitkuConfig = require(`${appRoot}/config/duitku-configuration`);
    const {
        requestTransaction,
        Transaction,
        ItemDetail
        } = require('../index.js');
    
    let transaction = new Transaction(10000, "VA", Date.now().toString(), "Test Payment")
    
    // Customer Detail
    let firstName          = "John";
    let lastName           = "Doe";
    let email              = "customer@gmail.com"
    let phoneNumber        = "081234567890"
    
    // Address
    let address             = "Jl. Kembangan Raya";
    let city               = "Jakarta";
    let postalCode         = "11530";
    let countryCode        = "ID";
    
    transaction.setEmail(email); // your customer email
    transaction.setPhoneNumber(phoneNumber); // your customer phone number (optional)
    transaction.setCustomerVaName(`${firstName} ${lastName}`); // display name on bank confirmation display
    transaction.getCustomerDetail().setFirstName(firstName);
    transaction.getCustomerDetail().setLastName(lastName);
    transaction.getCustomerDetail().setEmail(email);
    transaction.getCustomerDetail().setPhoneNumber(phoneNumber);
    transaction.getCustomerDetail().setShippingAddress(
        firstName,
        lastName,
        address,
        city,
        postalCode,
        phoneNumber,
        countryCode
    )
    transaction.getCustomerDetail().setShippingAddressEqualBillingAddress();
    
    // Item Details
    let item = new ItemDetail("Test Item", 0, 10000);
    
    transaction.addItemDetails(item.get());
    
    function callback(resp, error) {
        if (error) {
          done(error);
          return
        }
        try{
            expect(resp.merchantCode).toMatch(duitkuConfig.merchantCode)
            expect(resp.reference).toContain(duitkuConfig.merchantCode)
            expect(resp.paymentUrl).toContain("https://")
            expect(resp.vaNumber).toMatch(/^([0-9])*$/g)
            expect(resp.qrString).toBeUndefined()
            expect(resp.amount).toMatch(transaction.getPaymentAmount().toString())
            expect(resp.statusCode).toMatch("00")
            expect(resp.statusMessage).toMatch("SUCCESS")
            done()
        } catch (error){
            done(error)
        }
      }

    requestTransaction(transaction.get(), callback)
  });

test('Request transaction VA', done => {
    const appRoot = require('app-root-path');
    const duitkuConfig = require(`${appRoot}/config/duitku-configuration`);
    const {
        requestTransaction,
        Transaction,
        ItemDetail
        } = require('../index.js');
    
    let transaction = new Transaction(10000, "VA", "test_payment_01", "Test Payment")
    
    // Customer Detail
    let firstName          = "John";
    let lastName           = "Doe";
    let email              = "customer@gmail.com"
    let phoneNumber        = "081234567890"
    
    // Address
    let address             = "Jl. Kembangan Raya";
    let city               = "Jakarta";
    let postalCode         = "11530";
    let countryCode        = "ID";
    
    transaction.setEmail(email); // your customer email
    transaction.setPhoneNumber(phoneNumber); // your customer phone number (optional)
    transaction.setCustomerVaName(`${firstName} ${lastName}`); // display name on bank confirmation display
    transaction.getCustomerDetail().setFirstName(firstName);
    transaction.getCustomerDetail().setLastName(lastName);
    transaction.getCustomerDetail().setEmail(email);
    transaction.getCustomerDetail().setPhoneNumber(phoneNumber);
    transaction.getCustomerDetail().setShippingAddress(
        firstName,
        lastName,
        address,
        city,
        postalCode,
        phoneNumber,
        countryCode
    )
    transaction.getCustomerDetail().setShippingAddressEqualBillingAddress();
    
    // Item Details
    let item = new ItemDetail("Test Item", 0, 10000);
    
    transaction.addItemDetails(item.get());
    
    function callback(resp, error) {
        if (error) {
          done(error);
          return
        }
        try{
            expect(resp.merchantCode).toMatch(duitkuConfig.merchantCode)
            expect(resp.reference).toContain(duitkuConfig.merchantCode)
            expect(resp.paymentUrl).toContain("https://")
            expect(resp.vaNumber).toMatch(/^([0-9])*$/g)
            expect(resp.qrString).toBeUndefined()
            expect(resp.amount).toMatch(transaction.getPaymentAmount().toString())
            expect(resp.statusCode).toMatch("00")
            expect(resp.statusMessage).toMatch("SUCCESS")
            done()
        } catch (error){
            done(error)
        }
      }

    requestTransaction(transaction.get(), callback)
  });