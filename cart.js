function getCartItems() {
  db.collection("cart-items").onSnapshot((snapshot) => {
    let cartItems = [];
    snapshot.forEach((doc) => {
      cartItems.push({
        id: doc.id,
        ...doc.data(), //spread operator
        // image: doc.data().image,
        // name: doc.data().name,
        // make: doc.data().make,
        // rating: doc.data().rating,
        // price: doc.data().price,
      });
    });

    generateCartItems(cartItems);
  });
}

// // console.log(items);
function generateCartItems(cartItems) {
  let cartItemsHTML = "";
  cartItems.forEach((item) => {
    cartItemsHTML += `
        <div class="cart-item w-full flex items-center pb-4 border-b border-gray-100">
            <!-- Item image -->
            <div class="md:flex w-1/2">
              <div class="cart-item-image w-40 h-24 bg-white p-4 rounded-b-lg">
                  <img class="w-full h-full object-contain" src="${item.image}">
              </div>
              <!-- Item Details -->
              <div class="cart-item-details w-1/2">
                  <div class="cart-item-title font-bold text-sm text-gray-600">
                      ${item.name}
                  </div>
                  <div class="cart-item-brand text-sm text-gray-400">
                      ${item.make}
                  </div>
              </div>
            </div>
            <!-- Item Counter -->
            <div class="cart-item-counter mr-3 w-10 md:w-48 flex items-center">
                <div 
                    data-id="${item.id}" 
                    class="cart-item-decrease shadowb cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 mr-2">
                        <i class="fas fa-chevron-left fa-xs"></i>
                </div>
                <h4 class="text-gray-400">x${item.quantity}</h4>
                <div 
                    data-id="${item.id}" 
                    class="cart-item-increase shadowb cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200  ml-2">
                    <i class="fas fa-chevron-right fa-xs"></i>
                </div>
            </div>
            <!-- Item Total -->
            <div class="cart-item-total-cost w-20 md:w-48 font-bold text-gray-400">
                ${numeral(item.quantity * item.price).format("$0,0.00")} 

            </div>
            <!-- Item Delete -->
            <div 
                data-id="${item.id}"
                class="cart-item-delete w-5 font-bold text-gray-300 cursor-pointer hover:text-gray-400">
                <i class="fas fa-times"></i>
            </div>
        </div>
        `;
  });
  //  add wrapper to page
  document.querySelector(".cart-items").innerHTML = cartItemsHTML;
  createEvenListeners();
  getTotalCost(cartItems);
}

function createEvenListeners() {
  let decreaseButtons = document.querySelectorAll(".cart-item-decrease");
  let increaseButtons = document.querySelectorAll(".cart-item-increase");
  let deleteButtons = document.querySelectorAll(".cart-item-delete");

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      decreaseCount(button.dataset.id);
    });
  });
  increaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      increaseCount(button.dataset.id);
    });
  });
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      deleteItem(button.dataset.id);
    });
  });
}
//
function decreaseCount(itemId) {
  let cartItem = db.collection("cart-items").doc(itemId);

  cartItem.get().then((doc) => {
    if (doc.exists) {
      if (doc.data().quantity > 1) {
        cartItem.update({
          quantity: doc.data().quantity - 1,
        });
      }
    }
  });
}
function increaseCount(itemId) {
  let cartItem = db.collection("cart-items").doc(itemId);

  cartItem.get().then((doc) => {
    if (doc.exists) {
      if (doc.data().quantity > 0) {
        cartItem.update({
          quantity: doc.data().quantity + 1,
        });
      }
    }
  });
}

function deleteItem(itemId) {
  db.collection("cart-items").doc(itemId).delete();
}
function getTotalCost(cartItems) {
  let totalCost = 0;
  cartItems.forEach((item) => {
    totalCost += item.quantity * item.price;
  });

  document.querySelector(".total-cost-number").innerHTML =
    numeral(totalCost).format("$0,0.00");
}

getCartItems();
