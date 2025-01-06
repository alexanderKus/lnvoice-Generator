class Invoice {
    constructor(
        invoiceNumber, 
        issueDate, 
        salesDate, 
        dueDate, 
        payment,
        seller,
        buyer
    ) {
        this.invoiceNumber = invoiceNumber
        this.issueDate = issueDate
        this.salesDate = salesDate
        this.dueDate = dueDate
        this.payment = payment
        this.seller = seller
        this.buyer = buyer
    }
}

module.exports = Invoice