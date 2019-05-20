const puppeteer = require('puppeteer');

exports.function = async (req, res) => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 1024 });

  await page.goto('https://takeyuweb.co.jp/work', { waitUntil: 'domcontentloaded', timeout: 10000 });
  const elements = await page.$$('.section-work');
  const works = [];
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const title = await element.$eval('.work-title', e => e.innerText);
    const client = await element.$eval('.work-client', e => e.innerText);
    works.push({
      title: title,
      client: client
    });
  }

  res.send(works);
};
