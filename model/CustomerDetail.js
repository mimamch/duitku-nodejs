const Address = require("./Address.js");
const { 
    validatorEmail, 
    validatorString, 
    validatorPhoneNumber
 } = require('../helper/objectValidator.js')

class CustomerDetail{
   #firstName;
   #lastName;
   #email;
   #phoneNumber;
   #billingAddress;
   #shippingAddress;
    constructor(firstName = "", lastName = "", email = "", phoneNumber = ""){
        this.#firstName = firstName,
        this.#lastName = lastName,
        this.#email = email,
        this.#phoneNumber = phoneNumber,
        this.#billingAddress = new Address(firstName, lastName, "", "", "", phoneNumber, ""),
        this.#shippingAddress =  new Address(firstName, lastName, "", "", "", phoneNumber, "")
    }

    get(){
        return {
            firstName: this.getFirstName(),
            lastName: this.getLastName(),
            email: this.getEmail(),
            phoneNumber: this.getPhoneNumber(),
            billingAddress: this.getBillingAddress().get(),
            shippingAddress:  this.getShippingAddress().get()
        }
    }

    getFirstName(){
        return this.#firstName;
    }

    getLastName(){
        return this.#lastName;
    }

    getEmail(){
        return this.#email;
    }
    
    getPhoneNumber(){
        return this.#phoneNumber;
    }

    getBillingAddress(){
        return this.#billingAddress;
    }

    getShippingAddress(){
        return this.#shippingAddress;
    }

    setFirstName(newFirstName){
        validatorString(newFirstName, "firstName on Customer Detail")
        this.#firstName = newFirstName;
    }

    setLastName(newLastName){
        validatorString(newLastName, "lastName on Customer Detail")
        this.#lastName = newLastName;
    }

    setEmail(newEmail){
        validatorEmail(newEmail);
        this.#email = newEmail;
    }
    
    setPhoneNumber(newPhoneNumber){
        validatorPhoneNumber(newPhoneNumber)
        this.#phoneNumber = newPhoneNumber;
    }

    setBillingAddress(firstName, lastName, address, city, postalCode, phone, countryCode){
        if(firstName){
            this.#billingAddress.setFirstName(firstName)
        }
        if(lastName){
            this.#billingAddress.setLastName(lastName)
        }
        if(address){
            this.#billingAddress.setAddress(address)
        }
        if(city){
            this.#billingAddress.setCity(city)
        }
        if(postalCode){
            this.#billingAddress.setPostalCode(postalCode)
        }
        if(phone)[
            this.#billingAddress.setPhone(phone)
        ]
        if(countryCode){
            this.#billingAddress.setCountryCode(countryCode)
        }
    }

    setShippingAddress(firstName, lastName, address, city, postalCode, phone, countryCode){
        if(firstName){
            this.#billingAddress.setFirstName(firstName)
        }
        if(lastName){
            this.#billingAddress.setLastName(lastName)
        }
        if(address){
            this.#billingAddress.setAddress(address)
        }
        if(city){
            this.#billingAddress.setCity(city)
        }
        if(postalCode){
            this.#billingAddress.setPostalCode(postalCode)
        }
        if(phone)[
            this.#billingAddress.setPhone(phone)
        ]
        if(countryCode){
            this.#billingAddress.setCountryCode(countryCode)
        }
    }

    setBillingAddressEqualShippingAddress(){
        this.#billingAddress.setFirstName(this.#shippingAddress.getFirstName())
        this.#billingAddress.setLastName(this.#shippingAddress.getLastName())
        this.#billingAddress.setAddress(this.#shippingAddress.getAddress())
        this.#billingAddress.setCity(this.#shippingAddress.getCity())
        this.#billingAddress.setPostalCode(this.#shippingAddress.getPostalCode())
        this.#billingAddress.setPhone(this.#shippingAddress.getPhone())
        this.#billingAddress.setCountryCode(this.#shippingAddress.getCountryCode())
    }

    setShippingAddressEqualBillingAddress(){
        this.#shippingAddress.setFirstName(this.#billingAddress.getFirstName())
        this.#shippingAddress.setLastName(this.#billingAddress.getLastName())
        this.#shippingAddress.setAddress(this.#billingAddress.getAddress())
        this.#shippingAddress.setCity(this.#billingAddress.getCity())
        this.#shippingAddress.setPostalCode(this.#billingAddress.getPostalCode())
        this.#shippingAddress.setPhone(this.#billingAddress.getPhone())
        this.#shippingAddress.setCountryCode(this.#billingAddress.getCountryCode())
    }
}

module.exports = CustomerDetail;