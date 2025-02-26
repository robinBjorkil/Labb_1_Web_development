
document.addEventListener("DOMContentLoaded", () =>{

    /*  Produkterna i en array */
    const products = [
        {
            name: "Mexican Red Knee",
            latinName: "Brachypelma hamorii",
            price: 750,
            img: "Images/red_knee.webp",
            description: "A calm and beginner-friendly tarantula known for its striking red and black coloration."
        },
        {
            name: "Brazilian Black",
            latinName: "Grammostola pulchra",
            price: 900,
            img: "Images/brazilian_black.webp",
            description: "A docile tarantula with a stunning, velvety black appearance. Great for beginners."
        },
        {
            name: "Chilean Rose",
            latinName: "Grammostola rosea",
            price: 850,
            img: "Images/chilean_rose.webp",
            description: "A low-maintenance tarantula with a calm temperament and beautiful pinkish hues."
        },
        {
            name: "Brazilian White Knee",
            latinName: "Acanthoscuria geniculata",
            price: 1000,
            img: "Images/white_knee.webp",
            description: "An active species with striking white bands on its legs. Grows fairly large."
        },
        {
            name: "Goliath Birdeater",
            latinName: "Theraphosa blondi",
            price: 2500,
            img: "Images/goliath.webp",
            description: "One of the largest tarantulas in the world, known for its impressive size and appetite."
        },
        {
            name: "Green Bottle Blue",
            latinName: "Chromatopelma cyaneopubescens",
            price: 1500,
            img: "Images/gbb.webp",
            description: "A colorful and fast-moving tarantula with vibrant blue legs and an orange carapace."
        },
        {
            name: "Costa Rican Striped Knee",
            latinName: "Aphonopelma seemanni",
            price: 1200,
            img: "Images/chestnut_zebra.webp",
            description: "A burrowing species with a distinctive striped pattern on its legs."
        },
        {
            name: "Gooty Sapphire Ornamental",
            latinName: "Poecilotheria metallica",
            price: 2300,
            img: "Images/p_metallica.webp",
            description: "A rare and stunning blue tarantula with intricate white and yellow markings. Arboreal species."
        },
        {
            name: "Orange Baboon Tarantula",
            latinName: "Pterinochilus murinus",
            price: 1500,
            img: "Images/p_murinus.webp",
            description: "A highly defensive and fast-moving tarantula, also known as the 'OBT' (Orange Bitey Thing)."
        }
    ];

// Deklarering av variabler för modalen och dess element
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    const modalTitle = document.getElementById('productModalLabel');
    const modalImage = document.getElementById('modalProductImage');
    const modalDescription = document.getElementById('modalProductDescription');
    const modalPrice = document.getElementById('modalProductPrice');

/* Deklarering av variabler för produkterna, lägga till produkter, uppdatera pris
    tömma kundvagnen, uppdatera kundvagns-listan och totalpriset */
    const productContainer = document.getElementById("products");
    const cartList = document.getElementById("cart");
    const totalPriceElement = document.getElementById("total-price");
    const clearCartButton = document.getElementById("clear-cart");

    let cart = [];
    let total = 0;
     
// Här loopar jag igenom varje element i "products" och gör något med dessa element
   // Skapa ett fragment för att samla alla produktkort utan att uppdatera DOM direkt
const fragment = document.createDocumentFragment();

products.forEach((product, index) => {

    /* 1. Skapar en div-behållare för varje produkt
       2. Skapar en responsiv layout med Bootstrap CSS för div:en */
    const productCard = document.createElement("div");
    productCard.classList.add("col-md-4", "mb-4");

    // Varje div productCard får sitt innehåll bild, namn, price och köpknapp
    productCard.innerHTML = `
        <div class="card h-100">
            <img src="${product.img}" class="card-img-top"
             ${index < 1 ? "" : 'loading="lazy"'} 
             alt="${product.name}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text"><em>(${product.latinName})</em></p>
                <button class="btn btn-link btn-sm mt-auto view-details" data-index="${index}">View Description</button>
                <p class="card-text">${product.price} SEK</p>
                <button class="btn btn-success mt-auto add-to-cart">Add to Cart</button>
            </div>
        </div>
    `;

    fragment.appendChild(productCard);

    // Eventlistener med click för Add to Cart
    productCard.querySelector(".add-to-cart").addEventListener("click", function(event) {
        addToCart(product);
        showAddedConfirmation(event.target); // Här använder vi event.target för knappen
    });
});
productContainer.appendChild(fragment);


    // Event för "View Details"-knapp i modal
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("view-details")) {
            const productIndex = event.target.getAttribute("data-index");
            selectedProduct = products[productIndex];
    
            modalTitle.textContent = selectedProduct.name;
            modalImage.src = selectedProduct.img;
            modalImage.alt = selectedProduct.name;
            modalDescription.textContent = selectedProduct.description;
            modalPrice.textContent = `Price: ${selectedProduct.price} SEK`;
    
            productModal.show();
        }
    });

    // Event för "Add to Cart" i modalen
    document.querySelector(".add-to-cart-modal").addEventListener("click", () => {
        if (selectedProduct) {
            addToCart(selectedProduct); // 🔥 Lägg till vald produkt i kundvagnen

            const addToCartButton = document.querySelector(".add-to-cart-modal");
            showAddedConfirmation(addToCartButton);
        }
    });

// Funktion för att ge bekräftelse på köp 
function showAddedConfirmation(button) {
    button.classList.add("added");
    button.disabled = true;
    setTimeout(() => {
        button.classList.remove("added");
        button.disabled = false;
    }, 500);
}

    
// Funktion för att lägga till köp i kundvagnen "Cart"
    function addToCart(product){

         /* 1. Variabel för att hålla reda på mina köp i en li "list item
            2. Bootstrap för ett snyggare utseende*/
        const cartItem = document.createElement("li");
        cartItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        // Gör en lista av mina köp med namn och pris och en röd X-knapp för att ta bort
        cartItem.innerHTML = `
        ${product.name} - ${product.price} SEK
        <button class="btn btn-danger btn-sm remove-from-cart">X</button>
        `;

        // Lägger till produkten i kundvagnens lista på sidan, sparar den i arrayen cart och uppdaterar det totala priset.
        cartList.appendChild(cartItem);
        cart.push(product);
        updateTotal(product.price);

        // Eventlistener med click för X-knappen för att ta bort
        cartItem.querySelector(".remove-from-cart").addEventListener("click", () => {
            removeFromCart(product, cartItem);
        });  
    }

// Funktion för att ta bort enskilda rader med köp i kundvagn
    function removeFromCart(product, cartItem) {
        cartList.removeChild(cartItem);
        cart.splice(cart.indexOf(product), 1);
        updateTotal(-product.price);
    }

// Funktion för att uppdatera totalpriset i kundvagnen
    function updateTotal(amount) {
        total += amount;
        totalPriceElement.textContent = `Total: ${total} SEK`;
    }

// Funktion för att tömma hela kundvagnen
    clearCartButton.addEventListener("click", () => {
        cartList.innerHTML = "";
        cart = [];
        total = 0;
        totalPriceElement.textContent = "Total 0 SEK";
    });

    let chuckImg = { img: "Images/chuck_spider.webp" };

    function fetchJoke() {
        fetch("https://api.chucknorris.io/jokes/random")
            .then((chuck) => chuck.json())
            .then((data) => {
                document.getElementById("chuckJoke").innerHTML = `
                    <img id="chuckImage" src="${chuckImg.img}" alt="Picture of Chuck Norris" loading="lazy">
                    <p>${data.value}</p>
                `;
    
                
                document.getElementById("chuckImage").addEventListener("click", fetchJoke);
            });
    }
    
    fetchJoke();

});
