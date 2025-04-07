import { fetchData } from "../services/api.js";
import { link } from "./consts.js";

export async function getStoreName(id) {
    try {
        const deals = await fetchData(link.stores);
        const store = deals.find(store => store.storeID === id);
        return store ? store.storeName : 'Store not found';
    } catch (error) {
        console.error(error);
        return -1;
    }
}

export async function getStoreLogo(id) {
    try {
        const deals = await fetchData(link.stores);
        const store = deals.find(store => store.storeID === id);
        return store ? store.images.logo : 'Store not found';
    } catch (error) {
        console.error(error);
        return -1;
    }
}