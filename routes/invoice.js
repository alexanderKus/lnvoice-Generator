const express = require("express")
const ejs = require("ejs")
const puppeteer = require('puppeteer');
const path = require('path');
const Invoice = require('../models/invoice.model');
const Seller = require("../models/seller.model");
const Buyer = require("../models/buyer.model");
const Item = require("../models/item.model");
const General = require("../models/general.model")
const Summary = require("../models/summary.model")

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const data = createInvoice(req.body)
        const templatePath = path.join(__dirname, '../views/invoice.ejs');
        const html = await ejs.renderFile(templatePath, data)

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html);
        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, });
        const buffer = Buffer.from(pdfBuffer)
        await browser.close();
       
        let output = `invoice_${(new Date()).toLocaleDateString().replaceAll('.','_')}.pdf`
        res.setHeader('Content-Disposition', `attachment; filename="${output}"`);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(buffer);
    } catch(error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
})

const createInvoice = (body) => {
    const items = body.items.map(el => new Item(
        el.item,
        el.quantity, 
        el.netPrice, 
        el.totalNet, 
        el.vat, 
        el.vatAmount, 
        el.totalGross
    ))
    return new Invoice(
        new General(
            body.general.invoiceNumber,
            body.general.issueDate,
            body.general.salesDate,
            body.general.dueDate,
            body.general.payment,
        ),
        new Seller(
            body.seller.companyInfo,
            body.seller.nipVat,
            body.seller.account,
            body.seller.bankName,
            body.seller.swift
        ),
        new Buyer(
            body.buyer.companyInfo,
            body.buyer.vipVat
        ),
        items,
        new Summary(
            body.summary.totalNetPrice,
            body.summary.vatAmount,
            body.summary.totalGrossPrice
        ),
        body.notes,
        body.totalDue
    )
}

module.exports = router