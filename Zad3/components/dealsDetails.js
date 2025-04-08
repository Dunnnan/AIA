import { getStoreLogo, getStoreName } from "./getStoreInfo.js";

export async function loadDealsDetails(deal) {
        const mainContainer = document.getElementById('cards')
        mainContainer.innerHTML = ``;
        
        const card = document.createElement('div');
        card.className = 'container-details'
        
        const storeName = await getStoreName(deal.storeID);
        const storeLogo = await getStoreLogo(deal.storeID);

        card.innerHTML = `

            <img src="${deal.thumb}">

            <p class="title">${deal.title}</p>

            <p class="salePrice">${deal.salePrice}</p>
            <p class="normalPrice">${deal.normalPrice}</p>
            <p class="savings">-${Math.trunc(deal.savings)}%</p>

            <p class="metacriticScore">${deal.metacriticScore}</p>
            <p class="dealRating">${deal.dealRating}</p>

            <p class="storeName">${storeName}</p>
            <img src="https://www.cheapshark.com${storeLogo}" "class="storeName"></p>
            
            `;

            
        mainContainer.appendChild(card);
}