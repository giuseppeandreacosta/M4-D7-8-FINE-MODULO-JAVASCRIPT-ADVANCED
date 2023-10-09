document.addEventListener("DOMContentLoaded", async function () {
    const form = document.querySelector("#product-form");
    const tableBody = document.querySelector("#product-table tbody");
    const url = 'https://striveschool-api.herokuapp.com/api/product/';
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFmMDVlNWM3Mjg4NzAwMTg4N2ZmMGEiLCJpYXQiOjE2OTY1MzE5NDIsImV4cCI6MTY5Nzc0MTU0Mn0.6cs0ARUPsTkgRJrbj2X19YHkWGhDG-2ZheNq7747oEE';

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const name = document.querySelector("#name").value;
        const brand = document.querySelector("#brand").value;
        const images = document.querySelector("#images").value;
        const price = document.querySelector("#price").value;
        const description = document.querySelector("#description").value;

        const formData = {
            name: name,
            brand: brand,
            imageUrl: images,
            price: price,
            description: description
        };

        try {
            let response;
            if (form.dataset.mode === 'edit') {
                // Se il form è in modalità di modifica, esegui una richiesta PUT per aggiornare il prodotto
                response = await fetch(`${url}/${form.dataset.productId}`, {
                    method: "PUT",
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                });
            } else {
                // Altrimenti, esegui una richiesta POST per aggiungere un nuovo prodotto
                response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                });
            }

            if (response.ok) {
                console.log("Operazione completata con successo!");
                await getProducts();
                // Resettiamo il form dopo l'invio
                form.reset();
                form.dataset.mode = 'add';
                form.removeAttribute('data-product-id');
            } else {
                console.error("Errore di rete durante la richiesta:", response.statusText);
            }
        } catch (error) {
            console.error("Errore di rete durante la richiesta:", error);
        }
    });

    async function getProducts() {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });

            if (response.ok) {
                const products = await response.json();
                renderProducts(products);
            } else {
                console.error("Errore durante il recupero dei prodotti:", response.statusText);
            }
        } catch (error) {
            console.error("Errore di rete durante il recupero dei prodotti:", error);
        }
    }

    function renderProducts(products) {
        tableBody.innerHTML = "";

        products.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.brand}</td>
                <td><img src="${product.imageUrl}" alt="${product.name}" style="width: 100px; height: 100px;"></td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td><ion-icon name="create" class="edit-icon"></ion-icon></td>
                <td><ion-icon name="close" class="cancel-icon"></ion-icon></td>
            `;
            tableBody.appendChild(row);

            const editIcon = row.querySelector(".edit-icon");
            const cancelIcon = row.querySelector(".cancel-icon");

            editIcon.addEventListener("click", () => {
                // Mostra i valori del prodotto nel form quando si fa clic sull'icona "Edit"
                document.querySelector("#name").value = product.name;
                document.querySelector("#brand").value = product.brand;
                document.querySelector("#images").value = product.imageUrl;
                document.querySelector("#description").value = product.description;
                document.querySelector("#price").value = product.price;

                // Imposta il form in modalità modifica
                form.dataset.mode = 'edit';
                form.dataset.productId = product._id;
            });

            cancelIcon.addEventListener("click", async () => {
                // Logica per la cancellazione
                try {
                    const response = await fetch(`${url}/${product._id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token
                        }
                    });
                    if (response.ok) {
                        console.log("Prodotto cancellato con successo!");
                        await getProducts();
                        // Resettiamo il form dopo la cancellazione
                        form.reset();
                        form.dataset.mode = 'add';
                        form.removeAttribute('data-product-id');
                    } else {
                        console.error("Errore durante la cancellazione:", response.statusText);
                    }
                } catch (error) {
                    console.error("Errore durante la cancellazione:", error);
                }
            });
        });
    }

    // Richiedi la lista dei prodotti al caricamento della pagina
    await getProducts();
});
