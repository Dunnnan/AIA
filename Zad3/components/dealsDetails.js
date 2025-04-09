import { getStoreLogo, getStoreName } from "./getStoreInfo.js";

reloadButton.addEventListener("click", () => loadDealsList(link.deals));

export async function loadDealsDetails(deal) {
        const mainContainer = document.getElementById('cards')
        mainContainer.innerHTML = ``;
        
        const card = document.createElement('div');
        card.className = 'container-details'
        
        const storeName = await getStoreName(deal.storeID);
        const storeLogo = await getStoreLogo(deal.storeID);

        card.innerHTML = `

            <img src="${deal.thumb}">

            <p class="title"><strong>Title:</strong> ${deal.title}</p>
            <br>
            <p class="salePrice"><strong>Price:</strong> ${deal.salePrice}$</p>
            <p class="normalPrice"><strong>Normal price:</strong> ${deal.normalPrice}$</p>
            <p class="savings"><strong>Discount:</strong> -${Math.trunc(deal.savings)}%</p>
            <br>
            <p class="metacriticScore"><strong>Metacritic score:</strong> ${deal.metacriticScore}</p>
            <p class="dealRating"><strong>Deal rating:</strong> ${deal.dealRating}</p>
            <br>
            <p class="storeName"><strong>Store :</strong> ${storeName}</p>
            <img src="https://www.cheapshark.com${storeLogo}" "class="storeName"></p>
            
            `;

            
        mainContainer.appendChild(card);
}