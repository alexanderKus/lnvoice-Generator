class General {
    constructor(
        invoiceNumber, 
        issueDate, 
        salesDate, 
        dueDate, 
        payment,
    ) {
        this.invoiceNumber = invoiceNumber
        this.issueDate = issueDate
        this.salesDate = salesDate
        this.dueDate = dueDate
        this.payment = payment
    }
}

module.exports = General