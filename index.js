const puppeteer = require("puppeteer");
const uuid = require("uuid").v4;

const INSTRAGRAM_STORY = { width: 1080, height: 1920 };
const NUMERO_DE_POSTS = [...Array(20).keys()];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport(INSTRAGRAM_STORY);
  await page.setCacheEnabled(false);
  await page.goto("http://localhost:1234/");

  console.log("Generando imagenes");

  for (const _ of NUMERO_DE_POSTS) {
    await page.reload({ waitUntil: "networkidle0" });
    await page.screenshot({
      path: `./imagenes/${uuid()}.jpeg`,
      fullPage: true,
      type: "jpeg",
      quality: 100,
    });
  }

  await browser.close();
})();
