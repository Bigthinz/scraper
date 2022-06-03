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

    /*
    =================================================
    */

    //query the DOM
    const photos = await page.$$eval('img.Is-is-cached', imgs =>{
        //return the src of the image
        return imgs.map(img => img.src)
    })
    //loop through the photos
    for(const photo of photos){
        //view the photo url in the browser
        const imagePage = await page.goto(photo)
        //save the photo to a file
        await fs.writeFile(photo.split('/').pop(), await imagePage.buffer())
       
    }

    

    //close browser
    await browser.close()

}
//call start function
start()
