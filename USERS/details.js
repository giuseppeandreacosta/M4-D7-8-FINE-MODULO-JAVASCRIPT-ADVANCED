function attachDetailsButtonClickEvent(button, productId) {
    button.addEventListener('click', () => {
        window.location.href = `./details.html?id=${productId}`;
    });
}

async function fetchDataById(productId) {
    const url = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3ZmQ2Mzc3Y2RhYTAwMTQ2ZGYzOGMiLCJpYXQiOjE2OTgxNjgxNjMsImV4cCI6MTY5OTM3Nzc2M30.SeuQbMdwLd1DxEStBlCpKM99h8rDmJqHZq-7-BuZzXg';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Errore nella richiesta dell\'API');
        }

        const product = await response.json();
        displayProductDetails(product);
    } catch (error) {
        console.error('Errore:', error);
    }
}

function displayProductDetails(product) {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <div class="container">
            <h2>${product.name}</h2>
            <p>Prezzo: ${product.price}</p>
            <p>Descrizione: ${product.description}</p>
            <p>Brand: ${product.brand}</p>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', async function() {
    const searchData = getSearchParams();
    const productId = searchData.id;

    if (productId) {
        await fetchDataById(productId);
    }

    const detailsButton = document.querySelector('.details-item');
    if (detailsButton) {
        attachDetailsButtonClickEvent(detailsButton, productId);
    }
});

function getSearchParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const data = {};

    const productId = urlParams.get('id');
    if (productId) {
        data.id = productId;
    }

    return data;
}
