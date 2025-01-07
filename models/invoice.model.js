class Invoice {
    constructor(
        invoiceNumber, 
        issueDate, 
        salesDate, 
        dueDate, 
        payment,
        seller,
        buyer,
        item
    ) {
        this.invoiceNumber = invoiceNumber
        this.issueDate = issueDate
        this.salesDate = salesDate
        this.dueDate = dueDate
        this.payment = payment
        this.seller = seller
        this.buyer = buyer
        this.item = item
    }
}

module.exports = Invoice