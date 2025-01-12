class Invoice {
    constructor(
        general,
        seller,
        buyer,
        items,
        summary,
        notes,
        totalDue
    ) {
        this.general = general
        this.seller = seller
        this.buyer = buyer
        this.items = items
        this.summary = summary
        this.notes = notes
        this.totalDue = totalDue
    }
}

module.exports = Invoice