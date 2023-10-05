document.addEventListener("DOMContentLoaded", async function () {
    const form = document.getElementById("product-form");
    

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        

        const name = document.querySelector("#name").value;
        const brand = document.querySelector("#brand").value;
        const images = document.querySelector("#images").value;
        const price = document.querySelector("#price").value;
        const description = document.querySelector("#description").value;

        if (name && brand && images && price && description) {
            const formData = {
                name: name,
                brand: brand,
                imageUrl: images,
                price: price,
                description: description
            };

            // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFmMDVlNWM3Mjg4NzAwMTg4N2ZmMGEiLCJpYXQiOjE2OTY1MzE5NDIsImV4cCI6MTY5Nzc0MTU0Mn0.6cs0ARUPsTkgRJrbj2X19YHkWGhDG-2ZheNq7747oEE;

            try {
                // Richiesta POST
                const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFmMDVlNWM3Mjg4NzAwMTg4N2ZmMGEiLCJpYXQiOjE2OTY1MzE5NDIsImV4cCI6MTY5Nzc0MTU0Mn0.6cs0ARUPsTkgRJrbj2X19YHkWGhDG-2ZheNq7747oEE '
                    },
                });

                if (response.ok) {
                    console.log("Prodotto aggiunto con successo!");
                    window.location.href = "/USERS/users.html";

                    // Richiesta GET
                    try {
                        const getResponse = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFmMDVlNWM3Mjg4NzAwMTg4N2ZmMGEiLCJpYXQiOjE2OTY1MzE5NDIsImV4cCI6MTY5Nzc0MTU0Mn0.6cs0ARUPsTkgRJrbj2X19YHkWGhDG-2ZheNq7747oEE'
                            }
                        });

                        if (getResponse.ok) {
                            const products = await getResponse.json();
                            console.log("Lista dei prodotti:", products);
                        } else {
                            console.error("Errore durante il recupero dei prodotti:", getResponse.statusText);
                        }
                    } catch (error) {
                        console.error("Errore di rete durante il recupero dei prodotti:", error);
                    }
                } else {
                    console.error("Errore durante l'aggiunta del prodotto:", response.statusText);
                }
            } catch (error) {
                console.error("Errore di rete durante la richiesta POST:", error);
            }
        } else {
            console.error("Assicurati di compilare tutti i campi del modulo.");
        }
    });
});





               
                                
                               


                              