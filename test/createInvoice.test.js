test("Create Invoice", (done) => {
    const appRoot = require('app-root-path');
    const duitkuConfig = require(`${appRoot}/config/duitku-configuration`);
    const {
        createInvoice,
        Invoice,
        ItemDetail
        } = require('duitku');
    
    let invoice = new Invoice(10000, "test_payment_01", "Test Payment")
    
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
    
    invoice.setEmail(email); // your customer email
    invoice.setPhoneNumber(phoneNumber); // your customer phone number (optional)
    invoice.setCustomerVaName(`${firstName} ${lastName}`); // display name on bank confirmation display
    invoice.getCustomerDetail().setFirstName(firstName);
    invoice.getCustomerDetail().setLastName(lastName);
    invoice.getCustomerDetail().setEmail(email);
    invoice.getCustomerDetail().setPhoneNumber(phoneNumber);
    invoice.getCustomerDetail().setShippingAddress(
        firstName,
        lastName,
        address,
        city,
        postalCode,
        phoneNumber,
        countryCode
    )
    invoice.getCustomerDetail().setShippingAddressEqualBillingAddress();
    
    // Item Details
    let item = new ItemDetail("Test Item", 0, 10000);
    
    invoice.addItemDetails(item.get());
    
    createInvoice(invoice.get(), (resp, error) => {
        if (error) {
            done(error);
        }
        try{
            expect(resp.merchantCode).toMatch(duitkuConfig.merchantCode)
            expect(resp.reference).toContain(duitkuConfig.merchantCode)
            expect(resp.paymentUrl).toContain("https://")
            expect(resp.statusCode).toMatch("00")
            expect(resp.statusMessage).toMatch("SUCCESS")
            done()
        } catch (error){
            done(error)
        }
    })
})