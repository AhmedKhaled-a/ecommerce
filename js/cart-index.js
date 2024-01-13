const addProduct = document.querySelectorAll('#featured .container .products .product .addToCart');
const ul = document.querySelector('.items');
// the logged in user's data
// let activeUser = JSON.parse(localStorage.getItem('ListName')) // to get the looged in user from local storage instead of the next line
let activeUser = {
    'userId': 2,
    'userName': 'Mahmoud Ahmed',
}

// list of all users signed up with thier cart products
// let users = [
//     {
//         'userId': 1,
//         'name': "Mahmoud Ahmed", // to save the products of the active login user (activeUser.userId)
//         'products': [],
//     },
//     {
//         'userId': 2,
//         'name': "Ahmed Mahmoud",
//         'products': [],
//     },
//     {
//         'userId': 3,
//         'name': "Ayman Adel",
//         'products': [],
//     },
// ]
// localStorage.setItem('users', JSON.stringify(users))
let users = JSON.parse(localStorage.getItem('users'))
let userCart = JSON.parse(localStorage.getItem('userCart')) || [{ 'userId': activeUser.userId, 'products': [] }];
// let userCart = JSON.parse(localStorage.getItem('userCart'))
// console.log(userCart[0]['products'].length);

for (let x = 0; x < userCart.length; x++) {
    if ((activeUser['userId'] == userCart[x]['userId']) && (userCart[x]['products'].length !== 0)) {
        for(let i = 0; i < userCart[x]['products'].length; i++) {
            createElement(userCart[x].products[i])
        }
    }
}

// create li element for the product
function createElement(productObj) {
    // create a li item for the product just added
    let cartLi = document.createElement('li');
    cartLi.classList.add('item');

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
    cartPrice.textContent = `1 x ${productObj.productPrice}`;
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
}


// let userCart = [
//     {
//         'userId': 1,  // to save the products of the active login user (activeUser.userId)
//         'products': [],
//     },
//     {
//         'userId': 2,
//         'products': [],
//     },
// ]

// add products for the active user (loggedIn)


// get product info. when clicking on add to cart button
addProduct.forEach((btn) => {
    btn.addEventListener('click', function () {
        let product = btn.parentElement;
        let pId = product.id;
        let pName = product.querySelector('h2').textContent;
        let pImg = product.querySelector('img').src;
        let pPrice = product.querySelector('.price').textContent.slice(1); // price without $ sign

        let productObj = {
            'productId': pId,
            'productName': pName,
            'ProductImg': pImg,
            'productPrice': pPrice,
        }

        createElement(productObj);

        let found = false; // a flag to indicate if the user is found in the userCart array
        for (let x = 0; x < userCart.length; x++) {
            if (activeUser.userId === userCart[x]['userId']) {
                // if the user is found, push the product to their products array
                userCart[x].products.push(productObj);
                found = true; // set the flag to true
                break; // exit the loop
            }
        }
        if (!found) {
            // if the user is not found, push a new object with the user id and the product to the userCart array
            userCart.push({ 'userId': activeUser.userId, 'products': [productObj] });
        }
        // update the userCart data in the localStorage
        localStorage.setItem('userCart', JSON.stringify(userCart));

        // add products for the active user (loggedIn)
        for (let i = 0; i < users.length; i++) {
            if (activeUser.userId == users[i].userId) {
                // console.log('user id', users[i].userId);
                users[i].products.push(productObj)
                // console.log('user products', users[i].products);
                localStorage.setItem('users', JSON.stringify(users));
                // let userCart = [
                //     {
                //         'userId': users[i].userId,
                //         'products': []
                //     }
                // ]
                // for (let x = 0; x < userCart.length; x++) {
                //     if (activeUser.userId !== userCart[x]['userId']) {
                //         userCart.push({ 'userId': activeUser.userId, 'products': [] })
                //         userCart[x].products.push(productObj);
                //     }
                // }
                // userCart[i].products.push(productObj);
                // localStorage.setItem('userCart', JSON.stringify(userCart));
            }
        }

        // JSON.parse(localStorage.getItem('userCart'))
        // console.log('userCart => ', JSON.parse(localStorage.getItem('userCart')));
    })
})



// let activeUser = {
//     'userId': 1,
//     'userName': 'Mahmoud Ahmed',
// }

// let users = [
//     {
//         'userId': activeUser.userId, // to save the products of the active login user
//         'products': [{'product 1 form user 1': 'Name 1'}, {'product 1 form user 1': 'name 2'}]
//     },
//     {
//         'userId': 2,
//         'products': [{'product 1 form user 2': 'Name 1'}, {'product 1 form user 2': 'name 2'}]
//     },
// ]

// for (let i = 0; i < users.length; i++) {
//     if (activeUser.userId == users[i].userId) {
//         console.log(users[i].userId);
//         console.log(users[i].products);
//     }
// }