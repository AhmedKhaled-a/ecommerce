let allProductsContainer = document.querySelector('.p-container');
let ul = document.querySelector('.items');
let activeUser = JSON.parse(localStorage.getItem('loggedInUser')); // logged in user's data
let userCart;
if (activeUser) {userCart = JSON.parse(localStorage.getItem('userCart')) || [{ 'userId': activeUser.userId, 'products': [] }];}
let totalQuantity = 0;
let totalPrice = 0;


/**
 * Loads the logged-in user's items in the shopping cart.
 * 
 * @param {object[]} userCart - An array of objects representing the user's cart items.
 * @param {number} userCart[].userId - The user ID associated with the cart item.
 * @param {object[]} userCart[].products - An array of objects representing the products in the cart item.
 * @param {object} activeUser - An object representing the logged-in user.
 * @param {number} activeUser.userId - The user ID of the logged-in user.
 * @see {@link createElement} - the function that creates the HTML elements for the products.
 * @returns {void} - This function does not return anything.
 */
function loadUserItems() {
    for (let x = 0; x < userCart.length; x++) {
        if ((activeUser['userId'] == userCart[x]['userId']) && (userCart[x]['products'].length !== 0)) {
            for(let i = 0; i < userCart[x]['products'].length; i++) {
                createElement(userCart[x].products[i])
            }
        }
    }
}


/**
 * Creates an HTML element for the product item and appends it to the ul element.
 * 
 * @param {object} productObj - An object representing the product item.
 * @param {number} productObj.productId - The product ID.
 * @param {string} productObj.ProductImg - The product image URL.
 * @param {string} productObj.productName - The product name.
 * @param {number} productObj.productQuantity - The product quantity.
 * @param {number} productObj.productPrice - The product price.
 * @returns {void} - This function does not return anything.
 * @example
 * // Assuming productObj is defined as follows:
 * const productObj = {
 *   productId: 100,
 *   ProductImg: "/imgs/product-1.jpg",
 *   productName: "DNK Yellow Shoes",
 *   productQuantity: 1,
 *   productPrice: 120.00
 * };
 * // Calling the function will create and append the HTML element for the product item.
 * createElement(productObj);
 * // The HTML element will look like this:
 * `<li class="item" id="100">
 *   <img src="/imgs/product-1.jpg">
 *   <div class="item-desc">
 *     <span class="item-name">DNK Yellow Shoes</span>
 *     <span class="item-price"><span class="item-quantity">1</span> x $<span class="final-price">120.00</span></span>
 *   </div>
 *   <div class="delete-item-btn">
 *     <i class="fa-regular fa-circle-xmark mx-4 fs-4"></i>
 *   </div>
 * </li>`
 * @see {@link updateTotals} - The function that updates the total price and quantity of the cart items.
 */
function createElement(productObj) {
    // create a li item for the product just added
    let cartLi = document.createElement('li');
    cartLi.classList.add('item');
    cartLi.setAttribute('id', productObj.productId)

    // create an img tag and add the img src
    let cartImg = document.createElement('img');
    cartImg.src = productObj.ProductImg;

    // create div for the product name and price
    let cartDiv = document.createElement('div');
    cartDiv.classList.add('item-desc');
    // create span for product name
    let cartName = document.createElement('span');
    cartName.classList.add('item-name');
    cartName.textContent = productObj.productName;
    // create span for product price
    let cartPrice = document.createElement('span');
    cartPrice.classList.add('item-price');
    cartPrice.innerHTML = `<span class="item-quantity">${productObj.productQuantity}</span> x $<span class="final-price">${productObj.productPrice}</span>`;
    // add name and price to the item div
    cartDiv.appendChild(cartName);
    cartDiv.appendChild(cartPrice);

    // create delete button
    let cartDeleteBtn = document.createElement('div');
    cartDeleteBtn.classList.add('delete-item-btn');
    // create the delete icon
    let cartDeleteIcon = document.createElement('i');
    cartDeleteIcon.classList.add('fa-regular', 'fa-circle-xmark', 'mx-4', 'fs-4');
    // add delete icon as a child for the delete button
    cartDeleteBtn.appendChild(cartDeleteIcon);

    // add all elements to the item product li
    cartLi.appendChild(cartImg);
    cartLi.appendChild(cartDiv);
    cartLi.appendChild(cartDeleteBtn);
    ul.appendChild(cartLi);
    updateTotals();
}


/**
 * Adds a product to the user's cart, updates the local storage and the DOM, and shows the updated quantity of the clicked product.
 * 
 * @param {HTMLElement} product - The HTML element representing the product.
 * @param {number} product.id - The unique ID of the product.
 * @param {string} product.querySelector('h2').textContent - The name of the product.
 * @param {string} product.querySelector('img').src - The URL of the product image.
 * @param {string} product.querySelector('.price').textContent - The price of the product without the $ sign.
 * @returns {void} - Modifies the state of the shopping cart through side effects.
 * 
 * @see {@link createElement} - Creates an HTML element for the product item and appends it to the ul element.
 * @see {@link updateTotals} - Updates the total price and quantity of the cart items.
 * @see {@link updateCartNumber} - Updates the number of items in the cart icon.
 */
function addToCart(product) {
        let pId = product.id;
        let pName = product.querySelector('h2').textContent;
        let pImg = product.querySelector('img').src;
        let pPrice = product.querySelector('.price').textContent.slice(1); // price without $ sign .slice(1)
        let pQuantinty = 1

        let productObj = {
            'productId': pId,
            'productName': pName,
            'ProductImg': pImg,
            'productPrice': pPrice,
            'productQuantity': pQuantinty,
        }

        


        let found = false; // a flag to indicate if the user is found in the userCart array
        for (let x = 0; x < userCart.length; x++) {
            if (activeUser.userId === userCart[x]['userId']) { // if the user is found, check product and update quantity if the same product exists
                let allItems = document.querySelectorAll('li.item');
                let allItemsArray = [...allItems]; // convert the NodeList to an array
                let item = allItemsArray.find(item => item.id === productObj.productId);


                if (item) { // if the item exists in the cart increase the quantity and the total price
                    for (let i = 0; i < userCart[x].products.length; i++) {
                        if (userCart[x].products[i].productId == item.id) {
                            item.querySelector('.item-price').innerHTML = `<span class="item-quantity">${userCart[x].products[i].productQuantity+1}</span> x $<span class="final-price">${productObj.productPrice}</span>`;
                        }
                    }

                    // if the item exists in the cart increase the quantity in the localsotrage item 'userCart'
                    for (let i = 0; i < userCart.length; i++) {
                        if (userCart[i].userId === activeUser.userId) {
                            for (let x = 0; x < userCart[i].products.length; x++) {
                                if (userCart[i].products[x].productId == item.id) {
                                    userCart[i].products[x].productQuantity += 1;
                                }
                            }
                        }
                    }
                } else { // if the item does not exist in the cart then create new one
                    userCart[x].products.push(productObj);
                    createElement(productObj)
                }
                found = true;
                break;
            }
        }
        if (!found) {
            // if the user is not found, push a new object with the user id and the product to the userCart array
            userCart.push({ 'userId': activeUser.userId, 'products': [productObj] });
            createElement(productObj)
        }
        // update the userCart data in the localStorage
        localStorage.setItem('userCart', JSON.stringify(userCart));
        updateTotals()
        updateCartNumber()
}

/**
 * Adds a product to the user's cart when the user clicks on the shopping bag icon or the add to cart button.
 * 
 * @listens click
 * @param {Event} e - The click event object.
 * @see {@link addToCart} - The function that adds a product to the user's cart and updates the local storage and the DOM.
 */
allProductsContainer.addEventListener('click', function(e) {
    if(activeUser){
        if (e.target.matches('.fa-solid.fa-bag-shopping')) {
            let product = e.target.parentElement.parentElement;
            addToCart(product);
        } else if (e.target.matches('.addToCart')) {
            let product = e.target.parentElement;
            addToCart(product);
        }
    }else if (e.target.matches('.addToCart') || e.target.matches('.fa-solid.fa-bag-shopping')){
        alert('please login');
        location.assign('../login.html')
    }
})

/**
 * Updates total quantity and subtotal price of the cart items.
 * 
 * @param {number} totalQuantity - Total quantity of all products.
 * @param {number} totalPrice - Subtotal price of all products.
 * @returns {void} - This function does not return anything.
 */
function updateTotals() {
    // Reset totals before recalculating
    totalQuantity = 0;
    totalPrice = 0;

    // Iterate through each item in the cart
    document.querySelectorAll('.sidebar-items .items .item').forEach(item => {
        // Extract quantity and price from the item
        let quantity = parseInt(item.querySelector('.item-desc .item-price .item-quantity').textContent);
        let price = parseFloat(item.querySelector('.item-desc .item-price .final-price').textContent);

        // Update total quantity and total price
        totalQuantity += quantity;
        totalPrice += quantity * price;
    });

    // Update the display of total quantity and total price
    document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
}


/**
 * Removes an item from the shopping cart and the userCart local storage item.
 * @listens click
 * @param {Event} event - The click event object.
 * @returns {void} - This function does not return anything.
 * @see {@link updateTotals} - Function to recalculate the subtotal of price and count the quantity.
 * @see {@link updateCartNumber} - Function to recount the items in the user cart and show it on the cart icon.
 */
const sidebarItemsContainer = document.querySelector('.sidebar-items');

sidebarItemsContainer.addEventListener('click', function(event) {
    const target = event.target;

    // Check if the clicked element is a delete button
    if (target.classList.contains('fa-circle-xmark')) {
        let itemId = target.closest('.item').id;
        target.closest('.item').remove();

        for (let i = 0; i < userCart.length; i++) {
            if (userCart[i].userId === activeUser.userId) {
                for (let x = 0; x < userCart[i].products.length; x++) {
                    if (userCart[i].products[x].productId == itemId) {
                        userCart[i].products.splice(x, 1)
                        localStorage.setItem('userCart', JSON.stringify(userCart))
                    }
                }
            }
        }
    }
    updateTotals();
    updateCartNumber()
});

/**
 * Counts the products in the user cart list and shows the count on the cart icon.
 * 
 * @returns {void} - This function does not return anything.
 */
function updateCartNumber() {
    let items = document.querySelector('ul.items');
    let counter = items.getElementsByTagName('li');
    let icon = document.querySelector('i.fa-solid.fa-cart-shopping')
    icon.setAttribute('value', counter.length)
}


/**
 * Initializes the shopping cart by checking if there is a logged-in user.
 * If a logged-in user is present, it loads the user's items, updates the cart totals,
 * and displays the total count on the cart icon.
 *
 * @returns {void} - This function does not return anything.
 */
function initShoppingCart() {
    if (activeUser) {
        loadUserItems();
        updateTotals();
    }
    updateCartNumber()
}

initShoppingCart();