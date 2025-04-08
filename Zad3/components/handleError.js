
const mainContainer = document.getElementById('cards');

export function displayErrorMessage(error) {
    mainContainer.innerHTML = `
        <div style="color: red; font-size: 18px;">
            <strong>Error:</strong> ${error.message}.
        </div>
    `;
}