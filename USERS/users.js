const loader = document.getElementById('loader');

async function fetchData() {
    const url = 'https://striveschool-api.herokuapp.com/api/product/';
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

        const data = await response.json();
        const cardContainer = document.getElementById('card-container');

        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <div class="container">
                    <h2>${item.name}</h2>
                    <p>Prezzo: ${item.price}</p>
                    <p>Descrizione: ${item.description}</p>
                    <p>Brand: ${item.brand}</p>
                    <button class="details-item" data-id="${item._id}">Details</button>
                </div>
            `;
            cardContainer.appendChild(card);

            const detailsButton = card.querySelector('.details-item');
            attachDetailsButtonClickEvent(detailsButton, item._id);
        });
    } catch (error) {
        console.error('Errore:', error);
    }
}

function attachDetailsButtonClickEvent(button, productId) {
    button.addEventListener('click', async () => {
        loader.style.display = 'block'; // Mostra lo spinner

        try {
            await fetchDataById(productId);
        } catch (error) {
            console.error('Errore:', error);
        } finally {
            loader.style.display = 'none'; // Nascondi lo spinner
        }
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
    await fetchData();
});
