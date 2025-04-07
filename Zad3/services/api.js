export async function fetchData(link) {
    try {
        const response = await fetch(link);
        if (!response.ok) {
            throw new Error('Failed to fetch link');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return -1;
    }
}