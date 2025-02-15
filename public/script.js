document.getElementById("add-item-btn").addEventListener("click", () => addRow())
document.getElementById("currency").addEventListener("change", () => updateSummary())

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
    input.readOnly = true
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
    option23.text = "23%"
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
    input.readOnly = true
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
    input.readOnly = true
    input.addEventListener("input", () => calculate(row));
    cell.appendChild(input);
}

function calculate(row) {
    calculateRow(row)
    calculateTotal()
}

function calculateRow(row) {
    const quantity = row.cells[2]?.getElementsByClassName("quantity")[0]?.value
    const vat = row.cells[5]?.getElementsByClassName("vat-selector")[0]?.value
    const netPrinceCell = row.cells[3].getElementsByClassName("net-price")[0]
    const totalNetCell = row.cells[4].getElementsByClassName("total-net")[0]
    const vatAmountCell = row.cells[6].getElementsByClassName("vat-amount")[0]
    const totalGrossCell = row.cells[7].getElementsByClassName("total-gross")[0]
    if (!quantity || !vat || !netPrinceCell || !totalNetCell || !totalGrossCell || !vatAmountCell ) { 
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
    const chosenVatOption = table.rows[table.rows.length-1].cells[5].getElementsByClassName("vat-selector")[0].value
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
    const inTotalNet = footer.rows[0].cells[1]
    const inVatAmount = footer.rows[0].cells[3]
    const inTotalGross = footer.rows[0].cells[4]
    const inVat = footer.rows[0].cells[2]
    totalTotalNet.innerHTML = ttn.toFixed(2)
    totalVatAmount.innerHTML = tva.toFixed(2)
    totalTotalGross.innerHTML = ttg.toFixed(2)
    inTotalNet.innerHTML = ttn.toFixed(2)
    inVat.innerHTML = chosenVatOption === "0" ? "NP" : "23%"
    inVatAmount.innerHTML = tva.toFixed(2)
    inTotalGross.innerHTML = ttg.toFixed(2)

    updateSummary(ttn, tva, ttg)
}

function updateSummary(ttn, tva, ttg) {
    if (!ttn || !tva || !ttg) {
        const footer = document.getElementById("invoice-table-tfoot")    
        ttn = footer.rows[1].cells[1].innerHTML
        tva = footer.rows[1].cells[3].innerHTML
        ttg = footer.rows[1].cells[4].innerHTML
    }
    const currency = document.getElementById("currency")
    const summaryTotalNetPrice = document.getElementById("summary-total-net-price")
    const summaryVatAmount = document.getElementById("summary-vat-amount")
    const summaryTotalGrossPrice = document.getElementById("summary-total-gross-price")
    const summaryTotalDue = document.getElementById("total-due")
    summaryTotalNetPrice.value = `${ttn} ${currency.value}`
    summaryVatAmount.value = `${tva} ${currency.value}`
    summaryTotalGrossPrice.value = `${ttg} ${currency.value}`
    if (ttg <= 0) { 
        summaryTotalDue.value = ""
        return 
    }
    const ttgParts = String(ttg).split(".")
    summaryTotalDue.value = `${translate(Number(ttgParts[0]))} ${currency.value} ${translate(Number(ttgParts[1]))} groszy`
}

function translate(n) {
    const single_digit = ['zero', 'jeden', 'dwa', 'trzy', 'cztery', 'pięć', 'sześć', 'siedem', 'osiem', 'dziewięć']
    const double_digit = ['dziesięć', 'jedenaście', 'dwanaście', 'trzynaście', 'czternaście', 'piętnaście', 'szesnaście', 'siedemnaście', 'osiemnaście', 'dziewiętnaście']
    const below_hundred = ['dwadzieścia', 'trzydzieści', 'czterdzieści', 'pięćdziesiąt', 'sześćdziesiąt', 'siedemdziesiąt', 'osiemdziesiąt', 'dziewięćdziesiąt']

    let word = "";
    if (n < 10) {
        word = single_digit[n] + ' '
    } else if (n < 20) {
        word = double_digit[n - 10] + ' '
    } else if (n < 100) {
        let rem = translate(n % 10)
        word = below_hundred[(n - n % 10) / 10 - 2] + ' ' + rem
    } else if (n < 1000) {
        word = single_digit[Math.trunc(n / 100)] + ' sto ' + translate(n % 100)
    } else if (n < 1000000) {
        word = translate(parseInt(n / 1000)).trim() + ' tysiąc ' + translate(n % 1000)
    } else if (n < 1000000000) {
        word = translate(parseInt(n / 1000000)).trim() + ' milion ' + translate(n % 1000000)
    } else {
        word = translate(parseInt(n / 1000000000)).trim() + ' miliard ' + translate(n % 1000000000)
    }
    return word;
}

addRow()
updateSummary()