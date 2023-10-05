async function fetchData() {
    const url = 'https://striveschool-api.herokuapp.com/api/product/';
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFmMDVlNWM3Mjg4NzAwMTg4N2ZmMGEiLCJpYXQiOjE2OTY1MzE5NDIsImV4cCI6MTY5Nzc0MTU0Mn0.6cs0ARUPsTkgRJrbj2X19YHkWGhDG-2ZheNq7747oEE';
  
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
                </div>
            `;
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Errore:', error);
    }
}

fetchData();

  