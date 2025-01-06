const express = require("express")
const ejs = require("ejs")
const puppeteer = require('puppeteer');
const path = require('path');
const Invoice = require('../models/invoice.model');
const Seller = require("../models/seller.model");
const Buyer = require("../models/buyer.model");

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const data = createInvoice(req)
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

const createInvoice = (req) => {
    return new Invoice(
        req.body.invoiceNumber,
        req.body.issueDate,
        req.body.salesDate,
        req.body.dueDate,
        req.body.payment,
        new Seller(
            req.body.sellerCompanyInfo,
            req.body.sellerNipVat,
            req.body.sellerAccount,
            req.body.sellerBankName,
            req.body.sellerSwift
        ),
        new Buyer(
            req.body.buyerCompanyInfo,
            req.body.buyerNipVat
        )
    )
}

module.exports = router