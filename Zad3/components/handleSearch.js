import { fetchData } from "../services/api.js";
import { link } from "./consts.js";
import { loadDealsList } from "./dealsList.js";
import { loadDealsDetails } from "./dealsDetails.js";


export async function handleSearch() {
    const searchInput = document.getElementById("gameSearch").value;
    const deals = await fetchData(link.deals+"title="+searchInput);
    
    const mainContainer = document.getElementById('cards')
    mainContainer.innerHTML = ``;
    
    deals.forEach(deal => {
        const card = document.createElement('div');
        card.className = 'container'
        card.addEventListener('click', () => loadDealsDetails(deal));
        
        card.innerHTML = `
            <img src="${deal.thumb}">
            <div class="container-text">
                <p><strong>${deal.title}</strong></p>
                <p>-${Math.trunc(deal.savings)}%</p>
            <div>
            `;
    
        mainContainer.appendChild(card);
    });

}