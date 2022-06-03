const puppeteer = require('puppeteer')
const fs = require('fs/promises')

async function start(){
    //launch browser
    const browser = await puppeteer.launch()
    //open a new page
    const  page = await browser.newPage()
    //navigate to youtube
    await page.goto('https://nodecli.com/')
    //evaluate the page
    let name = await page.evaluate(() => {
        //query the DOM
        return Array.from(document.querySelectorAll('span.css-114e4nz-ExtraInfo p a .mdl')).map(x => x.textContent)
    })
    //print the result
    console.log(name)
    //save the result to a file
    await fs.writeFile('nodecli.txt', name.join("\r\n"))

    //close browser
    await browser.close()

}
//call start function
start()
