// let addProduct = document.querySelectorAll('.addToCart');
let allProductsContainer = document.querySelector('.p-container');
let ul = document.querySelector('.items');
// the logged in user's data
let activeUser = JSON.parse(localStorage.getItem('loggedInUser')) // to get the looged in user from local storage instead of the next line
let totalQuantity = 0;
let totalPrice = 0;
// let loggedInUser = {
//     'userId': 1,
//     'userName': 'Mahmoud Ahmed',
// }
// console.log(activeUser);
// localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))

let userCart = JSON.parse(localStorage.getItem('userCart')) || [{ 'userId': activeUser.userId, 'products': [] }];

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

// load the logged in user items list in the cart
function loadUserItems() {
    for (let x = 0; x < userCart.length; x++) {
        if ((activeUser['userId'] == userCart[x]['userId']) && (userCart[x]['products'].length !== 0)) {
            for(let i = 0; i < userCart[x]['products'].length; i++) {
                createElement(userCart[x].products[i])
            }
        }
    }
}

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

// create li element for the product
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

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

function addToCart(product) {
        let pId = product.id;
        let pName = product.querySelector('h2').textContent;
        let pImg = product.querySelector('img').src;
        let pPrice = product.querySelector('.price').textContent; // price without $ sign .slice(1)
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
                // convert the NodeList to an array
                let allItemsArray = [...allItems];
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
    
}

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

// no need to add any code in the category file (delegation)
allProductsContainer.addEventListener('click', function(e) {
    if (e.target.matches('.fa-solid.fa-bag-shopping')) { //? check the class agian after the final design to confirm it will be 'i' = '.fa-solid.fa-bag-shopping' or 'button' = '.addToCart'
        let product = e.target.parentElement.parentElement;
        addToCart(product);
    }
})

// add this code if we wanna to work without delegation
// const addProduct = document.querySelectorAll('.addToCart');
// addProduct.forEach((btn) => {
//     btn.addEventListener('click', function () {
//         let product = btn.parentElement;
//         addToCart(product);
//     });
// });

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

// Function to update total quantity and total price
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

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

// Delete Item Button
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
});

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

// Initialize the shopping cart
function initShoppingCart() {
    loadUserItems();
    updateTotals();
}

initShoppingCart();