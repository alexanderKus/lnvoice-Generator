class Invoice {
    constructor(
        general,
        seller,
        buyer,
        items
    ) {
        this.general = general
        this.seller = seller
        this.buyer = buyer
        this.items = items
    }
}

module.exports = Invoice