const puppeteer = require("puppeteer");

async function generatePdfFromHtml(html) {

    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setContent(html,{
        waitUntil:"domcontentloaded"
    });

    const pdf = await page.pdf({
        format:"A4",
        margin:{
            top:"20mm",
            bottom:"20mm",
            left:"15mm",
            right:"15mm"
        }
    });

    await browser.close();

    return pdf;

}

module.exports = {
    generatePdfFromHtml
};