const cartItems = document.getElementById("cart-items")
const backhome = document.getElementById("backhome")
const buynow = document.getElementById("buynow")

function cartproduct() {
    cartItems.innerHTML = ""; 
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
  
    function removeFromCart(productToRemove) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const remove = cart.findIndex(
        (item) => item.id === productToRemove.id
      );
      if (remove > -1) {
        cart.splice(remove, 1)
      }
      localStorage.setItem("cart", JSON.stringify(cart))
      cartproduct();
    }
  
    cart.forEach((item) => {
      const container = document.createElement("div")
      const image = document.createElement("img")
      const content = document.createElement("div")
      const title = document.createElement("h2")
      const price = document.createElement("p")
      const removeBtn = document.createElement("button")

      container.className = "cart-container"
      image.className = "cart-image"
      content.className = "cart-content"
      title.className = "cart-title"
      price.className = "cart-price"
      removeBtn.className = "remove-button"
  
      image.src = item.image.url
      image.alt = item.image.alt
      title.textContent = item.title
      price.textContent = `$${item.price}`
      removeBtn.textContent = "Remove Item";

      removeBtn.addEventListener("click", () => {
          removeFromCart(item)
      })

      backhome.addEventListener ("click", () => {
          location.href = "./index.html";
      })

      buynow.addEventListener ("click", () => {
          location.href = "sucsess.html"
      })
    
      content.appendChild(title)
      content.appendChild(price)
      content.appendChild(removeBtn)
      container.appendChild(image)
      container.appendChild(content)
      cartItems.appendChild(container)
      total += parseFloat(item.price)
    })
  
    document.querySelector(".total-amount").textContent = `Total Price: $${total.toFixed(
      2
    )}`
  }
  
cartproduct();