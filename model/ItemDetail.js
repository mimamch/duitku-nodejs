const { 
    validatorString, 
    validatorNumber
 } = require('../helper/objectValidator.js')

class ItemDetail{
    #name;
    #quantity;
    #price;
    constructor(name, qty, price){
        this.#name = validatorString(name, "name"),
        this.#quantity = validatorNumber(qty, "quantity"),
        this.#price = validatorNumber(price, "price")
    }

    get(){
        return {
            name: this.getName(),
            quantity: this.getQuantity(),
            price: this.getPrice()
        }
    }
    
    getName(){
        return this.#name;
    }

    getQuantity(){
        return this.#quantity;
    }
    
    getPrice(){
        return this.#price;
    }

    
    set(name, qty, price){
        this.setName(name),
        this.setQuantity(qty),
        this.setPrice(price)
    }

    setName(newName){
        validatorString(newName, "name")
        this.#name = newName;
    }
    
    setPrice(newPrice){
        validatorNumber(newPrice, "price")
        this.#price = newPrice;
    }
    
    setQuantity(newQuantity){
        validatorNumber(newQuantity, "quantity")
        this.#quantity = newQuantity;
    }
}

module.exports = ItemDetail;