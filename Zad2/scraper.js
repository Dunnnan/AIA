const request = require('request');
const rp = require('request-promise');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// URL of the website to scrape
const url = 'https://lubimyczytac.pl/katalog/ksiazki';

async function scrapeData() {
  try {
    // Fetch the HTML of the page
    const html = await rp(url);

    // Initialize jsdom with the fetched HTML
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Select all product elements
    const products = document.querySelectorAll('.row relative w-100');

    // Iterate over each product and extract details
    products.forEach(product => {
      const name = product.querySelector('.authorAllBooks__singleTextTitle float-left').textContent.trim();
      //const priceText = product.querySelector('.product-price').textContent.trim();
      //const price = parseFloat(priceText.replace('$', '').trim());
      //const volumeText = product.querySelector('.product-volume').textContent.trim();
      //const volume = parseFloat(volumeText.replace('ml', '').trim());
      //const ageText = product.querySelector('.product-age').textContent.trim();
      //const age = parseInt(ageText.replace(' years', '').trim(), 10);

      // Calculate the unit value
      //const unitValue = (price / volume) / age;

      // Output the product details
      console.log(`Name: ${name}`);
      //console.log(`Price: $${price}`);
      //console.log(`Volume: ${volume} ml`);
      //console.log(`Age: ${age} years`);
      //console.log(`Unit Value: $${unitValue.toFixed(2)} per year per 100ml`);
      //console.log('-----------------------------');
    });
  } catch (error) {
    console.error('Error scraping data:', error);
  }
}

scrapeData();
