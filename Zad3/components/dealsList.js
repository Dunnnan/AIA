import { loadDealsDetails } from "./dealsDetails.js";
import { fetchData } from "../services/api.js";

export async function loadDealsList(url) {
    const deals = await fetchData(url);

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
                <p class="discount">-${Math.trunc(deal.savings)}%</p>
            <div>
            `;

        mainContainer.appendChild(card);
    });
}