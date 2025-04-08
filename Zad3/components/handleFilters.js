import { fetchData } from "../services/api.js";
import { link } from "./consts.js";
import { loadDealsList } from "./dealsList.js";
import { loadDealsDetails } from "./dealsDetails.js";


export async function handleFilters() {
    const searchInput = document.getElementById("gameSearch").value;
    const upperFilter = document.getElementById("upperFilter").value;
    const metarcriticFilter = document.getElementById("metacriticFilter").value;
    const steamFilter = document.getElementById("steamFilter").value;
    
    let url = link.deals;

    if (searchInput) url += `title=`+searchInput;
    if (upperFilter > 0) url += `&upperPrice=`+upperFilter;
    if (metarcriticFilter > 0) url += `&metacritic=`+metarcriticFilter;
    if (steamFilter > 0) url += `&steamRating=`+steamFilter;

    loadDealsList(url);
}