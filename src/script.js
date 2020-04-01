// @ts-nocheck
const puppeteer = require("puppeteer");

module.exports = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.transfermarkt.com.br/statistik/weltrangliste");

  const information = await page.evaluate(() => {
    const ranking = [];
    const lenght = 25;

    for (let i = 1; i <= lenght; i++) {
      const elements = [];
      let obj = {};

      for (let j = 0; j < 7; j++) {
        const value = document.getElementsByClassName("items")[0].tHead
          .offsetParent.rows[i].cells[j].innerText;

        elements.push(value);
      }

      obj.position = Number(elements[0]);
      obj.pais = elements[1];
      obj.amountPlayers = Number(elements[2]);
      obj.age = parseFloat(elements[3]);
      obj.totalValue = elements[4];
      obj.confederation = elements[5];
      obj.points = Number(elements[6]);

      ranking.push(obj);
    }

    return ranking;
  });

  console.log("information", information);

  await browser.close();
};
