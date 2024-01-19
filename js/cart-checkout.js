let userCart = [];



document.getElementById("checkOutForm").addEventListener("submit" , (e) => {
    e.preventDefault();
});

function checkOut() {
    let usrID = getLoggedInUser();
    // alert
    alert("You Checked Out");
    // empty cart
    userCart.every((userProducts) => {
        if(Number(userProducts.userId) == usrID) {
            userProducts.products = []; // empty cart
            return false ;
        }
        else {
            return true;
        }

    });

    setLocalStr();



    // go to index
    window.location.replace("./index.html");
}

function renderCheckoutProducts() {
    let usrID = getLoggedInUser();
    let totalCalculated = document.getElementById("totalCal");
    let numberOfProductsEl = document.getElementById("productNo");
    let numberOfProducts = 0;
    let checkoutCartHeader = document.getElementById("checkoutCartHeader");

    if(userCart != null) {
        userCart.forEach((userProducts) => {
            // console.log(typeof(userProducts));
            let total = 0;
            let productParEl;
            let productNameEl;
            let productPriceEl;
            let price = 0;
            if(Number(userProducts.userId) == usrID) {
                userProducts.products.forEach((productItem) => {
                    // console.log(productItem);
                    price = productItem.productPrice;
                    numberOfProducts++;
                    total += price * productItem.productQuantity;
                    productParEl = document.createElement("p");
                    productNameEl = document.createElement("span");
                    productNameEl.innerHTML = productItem.productName + " ........... ";
                    productPriceEl = document.createElement("span");
                    productPriceEl.innerHTML = price * productItem.productQuantity ;

                    productParEl.insertAdjacentElement("beforeend" , productNameEl);
                    productParEl.insertAdjacentElement("beforeend" , productPriceEl);

                    checkoutCartHeader.insertAdjacentElement("afterend", productParEl);

                });
                totalCalculated.innerText = "$" + total.toFixed(2);
                numberOfProductsEl.innerText = numberOfProducts;
                // console.log(total);
            }
            return;
        });
    }
}

getFromLocalStorage();
renderCheckoutProducts();



