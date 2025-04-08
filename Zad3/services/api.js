const loadingSpinner = document.getElementById("loadingSpinner");

export async function fetchData(link) {
    try {
        loadingSpinner.style.display = 'block';

        const response = await fetch(link);
        if (!response.ok) {
            throw new Error('Failed to fetch link');
        }
        loadingSpinner.style.display = 'none';

        return await response.json();

    } catch (error) {
        loadingSpinner.style.display = 'none';
        displayErrorMessage(error);
        console.error(error);
        return -1;
    }
}