export class Item {
    constructor(
        item,
        quantity, 
        netPrice, 
        totalNet, 
        vat, 
        vatAmount, 
        totalGross
    ) {
        this.item = item
        this.quantity = quantity
        this.netPrice = netPrice
        this.totalNet = totalNet
        this.vat = vat
        this.vatAmount = vatAmount
        this.totalGross = totalGross
    }
}