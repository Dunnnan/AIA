import { loadDealsList } from "./components/dealsList.js";
import { fetchData } from "./services/api.js";
import { link } from "./components/consts.js";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const deals = await fetchData(link.deals);
        loadDealsList(deals);
    } catch (error) {
        console.error(error);
        return -1;
    }
    
});