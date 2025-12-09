// include.js
async function loadHTML(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
    }
}

// Load header and footer on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add containers for header and footer
    const headerContainer = document.createElement('div');
    headerContainer.id = 'header-include';
    document.body.insertBefore(headerContainer, document.body.firstChild);
    
    const footerContainer = document.createElement('div');
    footerContainer.id = 'footer-include';
    document.body.appendChild(footerContainer);
    
    // Load the header and footer
    loadHTML('header-include', 'components/header.html');
    loadHTML('footer-include', 'components/footer.html');
});