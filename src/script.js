const puppeteer = require("puppeteer");

module.exports = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.transfermarkt.com.br/statistik/weltrangliste");

  const information = await page.evaluate(() => {
    return {
      title: document.title
    };
  });
  console.log(information);
  await browser.close();
};
