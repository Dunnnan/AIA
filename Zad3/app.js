import { loadDealsList } from "./components/dealsList.js";
import { fetchData } from "./services/api.js";
import { link } from "./components/consts.js";
import { handleSearch } from "./components/handleSearch.js";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const deals = await fetchData(link.deals);
        reloadButton.addEventListener("click", reloadDealsList);
        loadDealsList(deals);
    } catch (error) {
        console.error(error);
        return -1;
    }
    
});

async function reloadDealsList(){
    try {
        const deals = await fetchData(link.deals);
        loadDealsList(deals);
    } catch (error) {
        console.error(error);
        return -1;
    }
}

document.getElementById("gameSearch").addEventListener("input", handleSearch);