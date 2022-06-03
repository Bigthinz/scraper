const puppeteer = require('puppeteer')

async function start(){
    //launch browser
    const browser = await puppeteer.launch()
    //open a new page
    const  page = await browser.newPage()
    //navigate to youtube
    await page.goto('https://www.youtube.com/watch?v=lgyszZhAZOI')
    //take screenshot of the page
    await page.screenshot({path: 'y9.png', fullPage: true})
    //close browser
    await browser.close()

}
//call start function
start()
