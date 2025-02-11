
document.addEventListener("DOMContentLoaded", () =>{

    /*  Produkterna i en array */
    const products = [

        {   name: "Mexican Red Knee",
            latinName: "Brachypelma hamorii",
            price: 750,
            img: "Images/red_knee.jpg"
        },

        {   name: "Brazilian Black",
            latinName: "Grammostola pulchra",
            price: 900,
            img: "Images/brazilian_black.jpg"
        },

        {   name: "Chilean Rose",
            latinName: "Grammostola rosea",
            price: 850,
            img: "Images/chilean_rose.jpg"
        },
        {   name: "Brazilian White Knee",
            latinName: "Acanthoscuria geniculata",
            price: 1000,
            img: "Images/white_knee.jpg"
        },

        {   name: "Goliath Birdeater",
            latinName: "Theraphosa blondi",
            price: 2500,
            img: "Images/goliath.jpg"
        },

        {   name: "Green Bottle Blue",
            latinName: "Chromatopelma cyaneopubescens",
            price: 1500,
            img: "Images/gbb.jpg"
        },

        {   name: "Costa Rican Striped Knee",
            latinName: "Aphonopelma seemanni",
            price: 1200,
            img: "Images/chestnut_zebra.jpg"
        },

        {   name: "Gooty Sapphire Ornamental",
            latinName: "Poecilotheria metallica",
            price: 2300,
            img: "Images/p_metallica.jpg"
        },

        {   name: "Orange Baboon Tarantula",
            latinName: "Pterinochilus murinus",
            price: 1500,
            img: "Images/p_murinus.jpg"
        }
    ];

    /* En variabel som får hålla produkterna */
    const productContainer = document.getElementById("products");

     
    /* Här loopar jag igenom varje element i "products" och gör något med dessa element */
    products.forEach((product, index) => {

        /* 1. Skapar en div-behållare för varje produkt
           2. Skapar en responsiv layout med Bootstrap CSS för div:en */
        const productCard = document.createElement("div");
        productCard.classList.add("col-md-4");

        /* Varje div productCard får sitt innehåll  bild, namn, price och köpknapp */
        productCard.innerHTML = `
            <div class="card">
                <img src="${product.img}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text"><em>(${product.latinName})</em></p>
                    <p class="card-text">${product.price} SEK</p>
                    <button class="btn btn-primary add-to-cart">Add to Cart</button>
                </div>
            </div>
        `;

        /* Nu fäster jag mitt productCard i min productContainer som sen visar innehållet i html */
        productContainer.appendChild(productCard);

        /* Eventlistener med click för Add to Cart */
        productCard.querySelector(".add-to-cart").addEventListener("click", () => {
            addToCart(product);
        });
    });










});
