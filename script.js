function getItems() {
  db.collection("items")
    .get()
    .then((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          image: doc.data().image,
          name: doc.data().name,
          make: doc.data().make,
          rating: doc.data().rating,
          price: doc.data().price,
        });

        // console.log(`${doc.id} => ${doc.data()}`);
      });
      //   console.log(items);
      generateItems(items);
    });
}

// // console.log(items);
function generateItems(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    //   create wrapper
    let doc = document.createElement("div");
    // add class to wrapper
    doc.classList.add(
      "main-product",
      "mr-3",
      "md:mr-5",
      "mt-5",
      "pb-1",
      "border-grey-700",
      "border-b-2"
    );
    // add div contents to wrapper
    doc.innerHTML = `
            <div class="product-image w-48 h-52 bg-white rounded-lg shadowb hovergrow  p-4">
                <img class="w-full h-full object-contain" src="${item.image}">
            </div>
            <div class="product-name text-gray-700 font-bold mt-2 text-sm w-48 truncate">
                ${item.name}
            </div>
            <div class="product-make text-green-700 font-bold">
                ${item.make}
            </div>
            <div class="product-rating text-yellow-300 font-bold my-1">
                ⭐⭐⭐⭐⭐ ${item.rating}
            </div>
            <div class="product-price font-bold text-gray-700 text-lg">
                ${numeral(item.price).format("$0,0.00")}
            </div>
        `;
    //create Add to cart button
    let addToCartEl = document.createElement("div");
    addToCartEl.classList.add(
      "hover:bg-yellow-600",
      "cursor-pointer",
      "product-add",
      "h-8",
      "w-28",
      "rounded",
      "bg-yellow-500",
      "text-white",
      "text-md",
      "flex",
      "justify-center",
      "items-center",
      "mx-8",
      "shadowb"
    );
    // add button inner text
    addToCartEl.innerText = "Add to Cart";
    addToCartEl.addEventListener("click", () => {
      addToCart(item);
    });
    //add button to wrapper
    doc.appendChild(addToCartEl);
    //  add wrapper to page
    document.querySelector(".main-section-products").appendChild(doc);
  });
  //   document.querySelector(".main-section-products").innerHTML = itemsHTML;
}

// send data to cart
function addToCart(item) {
  let cartItem = db.collection("cart-items").doc(item.id);
  cartItem.get().then((doc) => {
    if (doc.exists) {
      cartItem.update({
        quantity: doc.data().quantity + 1,
      });
    } else {
      cartItem.set({
        image: item.image,
        name: item.name,
        make: item.make,
        rating: item.rating,
        price: item.price,
        quantity: 1,
      });
    }
  });
}
getItems();
