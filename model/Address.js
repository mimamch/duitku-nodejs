const { 
    validatorString, 
    validatorPhoneNumber
 } = require('../helper/objectValidator.js')

class Address{
    #firstName;
    #lastName;
    #address;
    #city;
    #postalCode;
    #phone;
    #countryCode;
    constructor(firstName = "", lastName = "", address = "", city = "", postalCode = "", phone = "", countryCode = ""){
        this.#firstName = firstName,
        this.#lastName = lastName,
        this.#address = address,
        this.#city = city,
        this.#postalCode = postalCode,
        this.#phone = phone,
        this.#countryCode = countryCode
    }

    get(){
        return {
            firstName : this.getFirstName(),
            lastName : this.getLastName(),
            address : this.getAddress(),
            city : this.getCity(),
            postalCode : this.getPostalCode(),
            phone : this.getPhone(),
            countryCode : this.getCountryCode()
        }
    }

    getFirstName(){
        return this.#firstName;
    }

    getLastName(){
        return this.#lastName;
    }

    getAddress(){
        return this.#address;
    }

    getCity(){
        return this.#city;
    }
    
    getPostalCode(){
        return this.#postalCode;
    }

    getPhone(){
        return this.#phone;
    }

    getCountryCode(){
        return this.#countryCode;
    }
    
    setFirstName(newFirstName){
        validatorString(newFirstName, "FirstName")
        this.#firstName = newFirstName;
    }

    setLastName(newLastName){
        validatorString(newLastName, "LastName")
        this.#lastName = newLastName ;
    }

    setAddress(newAddress){
        validatorString(newAddress, "Address")
        this.#address = newAddress ;
    }

    setCity(newCity){
        validatorString(newCity, "City")
        this.#city = newCity ;
    }
    
    setPostalCode(newPostalCode){
        validatorString(newPostalCode, "PostalCode")
        this.#postalCode = newPostalCode ;
    }

    setPhone(newPhone){
        validatorPhoneNumber(newPhone)
        this.#phone = newPhone ;
    }

    setCountryCode(newCountryCode){
        validatorString(newCountryCode, "CountryCode")
        this.#countryCode = newCountryCode ;
    }
}

module.exports = Address;