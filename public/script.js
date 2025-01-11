let itemsCount = 0

function addRow() {
    let table = document.getElementById("invoice-table-tbody")    
    const tableLength = table.rows.length
    let newRow = table.insertRow(tableLength)

    addNo(newRow, tableLength+1)
    addItem(newRow)
    addQty(newRow)
    addNetPrice(newRow)
    addTotalNet(newRow)
    addVat(newRow)
    addVatAmount(newRow)
    addTotalGross(newRow)

    itemsCount++
}

function addNo(row, no) {
    let cell = document.createElement("th")
    cell.scope = "row"
    cell.innerHTML = no
    cell.name = "number"
    cell.className = "number"
    row.appendChild(cell)
}

function addItem(row) {
    let cell = row.insertCell(1);
    let input = document.createElement("input");
    input.type = "text";
    input.name = `items[${itemsCount}][item]`
    input.className = "item"
    cell.appendChild(input);
}

function addQty(row) {
    let cell = row.insertCell(2);
    let input = document.createElement("input");
    input.type = "number";
    input.min = 1
    input.max = 9999999999
    input.step = 1
    input.value = 1
    input.name = `items[${itemsCount}][quantity]`
    input.className = "quantity"
    input.addEventListener("input", () => calculate(row));
    cell.appendChild(input);
}

function addNetPrice(row) {
    let cell = row.insertCell(3);
    let input = document.createElement("input");
    input.type = "number";
    input.min = 0
    input.max = 9999999999
    input.step = 0.01
    input.value = 0
    input.name = `items[${itemsCount}][netPrice]`
    input.className = "net-price"
    input.addEventListener("input", () => calculate(row));
    cell.appendChild(input);
}

function addTotalNet(row) {
    let cell = row.insertCell(4);
    let input = document.createElement("input");
    input.type = "number";
    input.min = 0
    input.max = 9999999999
    input.step = 0.01
    input.value = 0
    input.name = `items[${itemsCount}][totalNet]`
    input.className = "total-net"
    cell.appendChild(input);
}

function addVat(row) {
    let cell = row.insertCell(5);
    let select = document.createElement("select");
    let optionNP = document.createElement("option")
    let option23 = document.createElement("option")
    select.name = `items[${itemsCount}][vat]`
    select.className = "vat-selector"
    optionNP.value = 0
    optionNP.text = "NP"
    option23.value = 0.23
    option23.text = "23"
    select.appendChild(optionNP)
    select.appendChild(option23)
    select.addEventListener("click", () => calculate(row));
    cell.appendChild(select);
}

function addVatAmount(row) {
    let cell = row.insertCell(6);
    let input = document.createElement("input");
    input.type = "number";
    input.min = 0
    input.max = 9999999999
    input.step = 0.01
    input.value = 0
    input.name = "vatAmount"
    input.name = `items[${itemsCount}][vatAmount]`
    input.className = "vat-amount"
    cell.appendChild(input);
}

function addTotalGross(row) {
    let cell = row.insertCell(7);
    let input = document.createElement("input");
    input.type = "number";
    input.min = 0
    input.max = 9999999999
    input.step = 0.01
    input.value = 0
    input.name = "totalGross"
    input.name = `items[${itemsCount}][totalGross]`
    input.className = "total-gross"
    input.addEventListener("input", () => calculate(row));
    cell.appendChild(input);
}

function calculate(row) {
    calculateRow(row)
    calculateTotal()
}

function calculateRow(row) {
    const quantity = row.cells[2]?.getElementsByClassName("quantity")[0]?.value || null
    const vat = row.cells[5]?.getElementsByClassName("vat-selector")[0]?.value || null
    const netPrinceCell = row.cells[3].getElementsByClassName("net-price")[0]
    const totalNetCell = row.cells[4].getElementsByClassName("total-net")[0]
    const vatAmountCell = row.cells[6].getElementsByClassName("vat-amount")[0]
    const totalGrossCell = row.cells[7].getElementsByClassName("total-gross")[0]
    if (quantity == null || vat == null || netPrinceCell == null || 
        totalNetCell == null || totalGrossCell == null || vatAmountCell == null) { 
        return 
    }
    const q = Number(quantity)
    const v = Number(vat)
    const np = Number(netPrinceCell.value)
    totalNetCell.value = np * q
    vatAmountCell.value = (((np * (1 + v)) * q) - (np * q)).toFixed(2)
    totalGrossCell.value = ((np * (1 + v)) * q).toFixed(2)
}

function calculateTotal() {
    const table = document.getElementById("invoice-table-tbody")    
    const footer = document.getElementById("invoice-table-tfoot")    
    let ttn = 0
    let tva = 0
    let ttg = 0
    for (let i = 0; i < table.rows.length; i++) {
        ttn += Number(table.rows[i].cells[4].getElementsByClassName("total-net")[0].value)
        tva += Number(table.rows[i].cells[6].getElementsByClassName("vat-amount")[0].value)
        ttg += Number(table.rows[i].cells[7].getElementsByClassName("total-gross")[0].value)
    }
    const totalTotalNet = footer.rows[1].cells[1]
    const totalVatAmount = footer.rows[1].cells[3]
    const totalTotalGross = footer.rows[1].cells[4]
    totalTotalNet.innerHTML = ttn
    totalVatAmount.innerHTML = tva
    totalTotalGross.innerHTML = ttg
}

addRow()