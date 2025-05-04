const container = document.querySelector(".grid")
const API_URL = "https://v2.api.noroff.dev/gamehub"

let products =[];

function gameProducts(products) {
    container.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      const image = document.createElement("img");
      const content = document.createElement("div");
      const title = document.createElement("h2");
      const genre = document.createElement("p")
      const price = document.createElement("p");
      const anchor = document.createElement("a");
  
      card.className = "card";
      image.className = "card-image";
      content.className = "card-content";
      title.className = "card-title";
      genre.className = "card-genre"
      price.className = "card-price";
      anchor.className = "card";
  
      image.src = product.image.url;
      image.alt = product.image.alt;
      title.textContent = product.title;
      price.textContent = `$${product.price}`;
      genre.textContent = `${product.genre}`
      anchor.href = `product/index.html?id=${product.id}`;
  
      content.appendChild(title);
      content.appendChild(genre)
      content.appendChild(price);
      card.appendChild(image);
      card.appendChild(content);
      anchor.appendChild(card);
      container.appendChild(anchor);

    if (product.onSale) {
      const priceaftersale = document.createElement("p")
      priceaftersale.textContent = `$ ${product.discountedPrice}`
      priceaftersale.className = 'priceaftersale'
      price.id = 'card-price-sale'
      
      price.appendChild(priceaftersale)
    }

  })
}

async function fetchAndCreateProducts() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    const products = data.data

    gameProducts(products);

    document.getElementById("genere-action").addEventListener("click", () => {
      const productgenere = products.filter(
        (product) => product.genre === "Action"
      )
      gameProducts(productgenere);
    })

    document.getElementById("genere-all").addEventListener("click", () => {
      gameProducts(products);
    })

    document.getElementById("genere-horror").addEventListener("click", () => {
      const productgenere = products.filter(
        (product) => product.genre === "Horror"
      )
      gameProducts(productgenere);
    })

    document.getElementById("genere-sport").addEventListener("click", () => {
      const productgenere = products.filter(
        (product) => product.genre === "Sports"
      )
      gameProducts(productgenere);
    })

    document.getElementById("genere-adventure").addEventListener("click", () => {
      const productgenere = products.filter(
        (product) => product.genre === "Adventure"
      )
      gameProducts(productgenere);
    })

    document.getElementById("onsale").addEventListener("click", () => {
      const productgenere = products.filter(
        (product) => product.onSale === true
      )
      gameProducts(productgenere);
    })

    } catch(error) {
      console.error("Error creating Products", error)
    }
}

fetchAndCreateProducts();