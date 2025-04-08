import { loadDealsList } from "./components/dealsList.js";
import { link } from "./components/consts.js";
import { handleFilters } from "./components/handleFilters.js";
import { displayErrorMessage } from "./components/handleError.js";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        loadDealsList(link.deals);
    } catch (error) {

        displayErrorMessage(error);
        console.error(error);
        return -1;

    }
    
});

document.getElementById("gameSearch").addEventListener("keydown", function(event){
    if (event.key === 'Enter') {
        handleFilters();
    }
});
document.getElementById("upperFilter").addEventListener("input", handleFilters);
document.getElementById("metacriticFilter").addEventListener("input", handleFilters);
document.getElementById("steamFilter").addEventListener("input", handleFilters);


reloadButton.addEventListener("click", () => loadDealsList(link.deals));