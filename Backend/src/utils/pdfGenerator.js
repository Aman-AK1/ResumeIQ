// const puppeteer = require("puppeteer");

// async function generatePdfFromHtml(html) {

//     const browser = await puppeteer.launch();

//     const page = await browser.newPage();

//     await page.setContent(html,{
//         waitUntil:"domcontentloaded"
//     });

//     const pdf = await page.pdf({
//         format:"A4",
//         margin:{
//             top:"20mm",
//             bottom:"20mm",
//             left:"15mm",
//             right:"15mm"
//         }
//     });

//     await browser.close();

//     return pdf;

// }

const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

async function generatePdfFromHtml(html) {
    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
    });

    try {
        const page = await browser.newPage();

        await page.setContent(html, {
            waitUntil: "domcontentloaded"
        });

        const pdf = await page.pdf({
            format: "A4",
            margin: {
                top: "20mm",
                bottom: "20mm",
                left: "15mm",
                right: "15mm"
            }
        });

        return pdf;
    } finally {
        await browser.close();
    }
}


module.exports = {
    generatePdfFromHtml
};