const express = require("express")
const ejs = require("ejs")
const puppeteer = require('puppeteer');
const path = require('path');

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const data = { name: "aleksander" }
        const templatePath = path.join(__dirname, '../views/invoice.ejs');
        const html = await ejs.renderFile(templatePath, data)

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html);
        await page.emulateMediaType('screen');

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        await browser.close();
        
        res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    } catch(error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
})

module.exports = router