document.addEventListener("DOMContentLoaded", () => {
  const addToCartButton = document.querySelectorAll(".add-to-cart");
  const cartItemCount = document.querySelectorAll(".cart-icon span");
  const cartItemsList = document.querySelectorAll(".cart-items");
  const cartTotal = document.querySelectorAll(".cart-total");
  const cartIcon = document.querySelectorAll(".cart-icon");
  const sidebar = document.getElementById(".sidebar");

  let cartItems = [];
  let totalAmount = 0;

  addToCartButton.forEach((button, index) => {
    button.addEventListener("click", () => {
      const item = {
        name: document.querySelectorAll(".card .card-title")[index].textContent,
        price: parseFloat(
          document.querySelectorAll(".price")[index].textContent.slice(1)
        ),
        quantity: 1,
      };
      const exisitingItem = cartItems.find(
        (cartItem) => cartItem.name === item.name
      );
      if (exisitingItem) {
        exisitingItem.quantity++;
      } else {
        cartItems.push(item);
      }

      totalAmount += item.price;

      updateCartUI();
    });
    function updateCartUI() {
      updateCartItemCount(cartItems.length);
      updateCartItemList();
      updateCartTotal();
    }

    function updateCartItemCount(count) {
      cartItemCount.textContent = count;
    }

    function updateCartItemList() {
      cartItemsList.innerHTML = "";
      cartItems.concat.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item", "individual-cart-item");
        cartItem.innerHTML = `
                
                <span> (${item.quantity}x)${item.name}</span>
                <span class="cart-item-price"> ${(
                  item.price * item.quantity
                ).toFixed(2)}
                <button class="remove-item" data-index="${index}"><i class="fa-solid fa-items"</i></button>
                </span>
                `;
        cartItemsList.append(cartItem);
      });

      const removeButton = document.querySelectorAll(".remove-item");
      removeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const index = event.target.dataset.index;
          removeItemFromCart(index);
        });
      });
    }

    function removeItemFromCart(index) {
      const removeItem = cartItems.splice(index, 1)[0];
      totalAmount -= removeItem.price * removeItem.quantity;
      updateCartUI();
    }

    function updateCartTotal() {
      cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
    }

    cartIcon.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });

    const closeButton = document.querySelector(".sidebar-close");
    closeButton.addEventListener("click", () => {
      sidebar.classList, remove("open");
    });
  });
});
