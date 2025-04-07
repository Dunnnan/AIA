const axios = require("axios");
const cheerio = require("cheerio");

const urls = [
  "https://www.taniaksiazka.pl/komiksy-c-14141_14278.html",
  "https://www.taniaksiazka.pl/komiksy-c-14141_14278.html",
  "https://www.taniaksiazka.pl/komiksy-c-14141_14278.html"
];

// Pierwszy krok: Pobieranie tylko linków
async function scrapeLinks() {
  try {

    for (const url of urls) {
    
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const bookLinks = [];

    $("a.ecommerce-datalayer").each((index, element) => {
      const link = $(element).attr("href");

      if (link) {
        const fullUrl = `https://www.taniaksiazka.pl${link}`;
        bookLinks.push(fullUrl);
      }
    });

    for (const bookUrl of bookLinks) {
      await scrapeBookDetails(bookUrl);
    }
  }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

async function scrapeBookDetails(bookUrl) {
  try {
    const { data } = await axios.get(bookUrl);
    const $ = cheerio.load(data);

    const bookTitle = $('meta[property="og:title"]').attr("content");
    const price = $('meta[property="product:price:amount"]').attr("content");
    const rating = $('meta[property="product:reviews_avg"]').attr("content");

    const pages = $("li.display-detail")
      .filter((index, element) => {
        return $(element).text().includes("stron");
      })
      .find("strong")
      .text()
      .trim();

    if (rating == 0) return;
    const unitValue = price / (pages * rating);

    console.log(
      `${price}zł | ${rating} | ${pages} | ${unitValue.toFixed(2)}zł | ${bookTitle}`,
    );
  } catch (error) {
    console.error(`Error fetching book details: ${error.message}`);
  }
}

scrapeLinks();
