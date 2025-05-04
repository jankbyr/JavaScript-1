const container = document.querySelector(".js-game")
const API_URL =  "https://v2.api.noroff.dev/gamehub"

async function game() {
  try {
        const params = new URLSearchParams(window.location.search)
        const id = params.get("id")

      if (!id) {
          container.textContent = "No Product ID provided!"
          return;
      }
      
      const response = await fetch(`${API_URL}/${id}`)
      const data = await response.json()
      const product = data.data
      
      const productDiv = document.createElement("div");
      const image = document.createElement("img");
      const title = document.createElement("h1");
      const description = document.createElement("p");
      const price = document.createElement("p");
      const backbtn = document.createElement("button");
      const toCart = document.createElement("button");
      const gotoCart = document.createElement("button");
      const realisedate = document.createElement("p")
      const age = document.createElement("p")
      const onSale = document.createElement("p")
      const discount = document.createElement ("p")
      
      productDiv.className = 'addtocartimg-container'
      image.className = 'product-image'
      title.className = 'product-title'
      price.className = 'addtocart-price'
      description.className = 'product-desc'
      backbtn.className ='back-btn'
      toCart.className = 'cart-btn'
      gotoCart.className = 'go-to-cart'
      realisedate.className = 'realisedate'
      age.className = 'age'
      onSale.className = 'discount-price'
      
      image.src = product.image.url
      image.alt = product.image.alt
      title.textContent = product.title
      price.textContent = `$${product.price}`
      description.textContent = product.description
      backbtn.textContent = 'Home'
      toCart.textContent = 'Add to Cart'
      gotoCart.textContent = 'My Cart'
      realisedate.textContent = `Released: ${product.released}`
      age.textContent = `Age: ${product.ageRating}`
      onSale.textContent = ""
    
    if (product.onSale) {
      const onsaletext =document.createElement("h2")
      const discount = document.createElement("p")
      const saleprice = document.createElement("p")
      onsaletext.textContent = 'Product on sale'
      discount.textContent = `Price After Sale $ ${product.discountedPrice}`
      discount.className = 'discount-price'
      price.textContent =`Price Before Sale: $ ${product.price}`
      onsaletext.className ='onsaletext'

      productDiv.appendChild(onsaletext)
      onSale.appendChild(discount)
    }

    backbtn.addEventListener ("click", () => {
        location.href = "../index.html";
    });

    toCart.addEventListener("click", () => {
        addToCart(product);
    });
    
  function addToCart(product) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
  }

  gotoCart.addEventListener("click", () => {
      location.href = "../checkout.html";
  });
  
    productDiv.appendChild(image)
    productDiv.appendChild(title)
    productDiv.appendChild(age)
    productDiv.appendChild(realisedate)
    productDiv.appendChild(description)
    productDiv.appendChild(price)
    productDiv.appendChild(onSale)
    
    productDiv.appendChild(backbtn)
    productDiv.appendChild(toCart)
    productDiv.appendChild(gotoCart)
    
    container.appendChild(productDiv)

  } catch (error) {
        console.error("Failed to Fetch", error)
      
  }
}
game();