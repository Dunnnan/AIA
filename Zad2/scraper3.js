const request = require("request-promise");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const allBookDetails = [];

const urls = [
  "https://www.taniaksiazka.pl/komiksy-c-14141_14278.html/page-1#products-list-pos",
  "https://www.taniaksiazka.pl/komiksy-c-14141_14278.html/page-2#products-list-pos",
  "https://www.taniaksiazka.pl/komiksy-c-14141_14278.html/page-3#products-list-pos",
];

// Pierwszy krok: Pobieranie tylko linków
async function scrapeLinks() {
  try {
    for (const url of urls) {
      //const { data } = await axios.get(url);
      //const $ = cheerio.load(data);

      const data = await request(url);
      const dom = new JSDOM(data);
      const page = dom.window.document;

      const bookLinks = [];

      // Szukamy wszystkich linków <a> z klasą 'ecommerce-datalayer'
      page.querySelectorAll("a.ecommerce-datalayer").forEach((element) => {
        const link = element.getAttribute("href"); // Pobieranie href

        if (link && !bookLinks.includes(`https://www.taniaksiazka.pl${link}`)) {
          const fullUrl = `https://www.taniaksiazka.pl${link}`; // Tworzymy pełny URL
          bookLinks.push(fullUrl); // Dodajemy link do tablicy
        }
      });

      // Przechodzimy do każdego linku, aby pobrać szczegóły
      const promises = bookLinks.map((bookUrl) => scrapeBookDetails(bookUrl));
      await Promise.all(promises);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Drugi krok: Pobieranie szczegółowych informacji o książce
async function scrapeBookDetails(bookUrl) {
  try {
    const data = await request(bookUrl);
    const dom = new JSDOM(data);
    const page = dom.window.document;

    page.querySelectorAll;

    // Pobieranie nazwy książki
    const bookTitle = page
      .querySelector('meta[property="og:title"]')
      .getAttribute("Content");

    // Pobieranie ceny książki
    const price = parseFloat(
      page
        .querySelector('meta[property="product:price:amount"]')
        .getAttribute("Content"),
    );

    // Pobieranie ratingu książki
    const rating = parseFloat(
      page
        .querySelector('meta[property="product:reviews_avg"]')
        .getAttribute("Content"),
    );

    // Pobieranie liczby stron książki
    let pages = 0;
    page.querySelectorAll("li.display-detail").forEach((element) => {
      if (element.textContent.includes("stron")) {
        const strongElement = element.querySelector("strong");
        if (strongElement) {
          pages = parseInt(strongElement.textContent.trim());
        }
      }
    });

    if (price == 0 || pages == 0 || rating == 0) return;
    const unitValue = price / (pages * rating);

    const bookDetails = {
      price: price.toFixed(2),
      rating: rating,
      pages: pages,
      unitValue: unitValue.toFixed(2),
      bookTitle: bookTitle,
    };
    allBookDetails.push(bookDetails);

    // Wyświetlanie szczegółów książki w jednej linii
    console.log(
      `${price.toFixed(2)}zł | ${rating} | ${pages} | ${unitValue.toFixed(2)}zł | ${bookTitle}`,
    );
  } catch (error) {
    console.error(`Error fetching book details: ${error.message}`);
  }
}

// Uruchomienie procesu
scrapeLinks();
