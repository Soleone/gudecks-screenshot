import puppeteer from "puppeteer";

const URL = "https://gudecks.com/decks/GU_1_2_CCmCCmCCQGAeGCEGCEIAlIAlCDDCDDIClIClCEPCEPKDSKDSBEXBEXCEwCEwICyCFUIAkIAkCEcCEcKCuBDuBDuKDX";
const FILENAME = "screenshot06.png";

const clip = {
  x: 370,
  y: 220,
  width: 710,
  height: 1000,
};

(async () => {
  const browser = await puppeteer.launch({ headless: "new", defaultViewport: { width: 1920, height: 1080 } });
  try {
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "networkidle0" });
    await page.screenshot({
      clip,
      path: FILENAME,
    });
  } catch (e) {
    console.log(e);
  } finally {
    await browser.close();
    console.log("Screenshot completed");
  }
})();