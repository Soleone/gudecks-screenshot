import puppeteer from "puppeteer";
import http from "http";
import url from "url";

const PORT = 3000;
const BASE_URL = "https://gudecks.com/decks/";

const clip = {
  x: 370,
  y: 220,
  width: 710,
  height: 1000,
};

const image = (async (url) => {
  const browser = await puppeteer.launch({ headless: "new", defaultViewport: { width: 1920, height: 1080 } });
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    return await page.screenshot({
      clip,
      // path: "<FILENAME>",
    });
  } catch (e) {
    console.log(e);
  } finally {
    await browser.close();
    console.log("Screenshot completed");
  }
})


const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url);
  const deckcode = parsedUrl.path.replace(/^\//, "");
  console.log(`Fetching deck ${deckcode}`)

  const imageByteArray = await image(`${BASE_URL}${deckcode}`);

  console.log("Returning image");
  res.setHeader('Content-Type', 'image/png');
  res.end(imageByteArray);
});

server.listen(PORT, () => {
  console.log(`Gudecks screenshot server is running on port ${PORT}`);
});