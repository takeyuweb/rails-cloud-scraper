const puppeteer = require('puppeteer');

exports.function = async (event, context) => {
  const data = Buffer.from(context.message.data, "base64").toString();
  console.log(data);
  console.log(context);

  const pageInfo = await getPageInfo(data);
  console.log(pageInfo);
};

async function getPageInfo(url) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 1024 });

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
  const pageInfo = {
    title: await page.title(),
    url: await page.url()
  };
  browser.close();

  return pageInfo;
}
