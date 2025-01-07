class Item {
    constructor(
        quantity, 
        netPrice, 
        totalNet, 
        vat, 
        vatAmount, 
        totalGross
    ) {
        this.quantity = quantity
        this.netPrice = netPrice
        this.totalNet = totalNet
        this.vat = vat
        this.vatAmount = vatAmount
        this.totalGross = totalGross
    }
}

module.exports = Item