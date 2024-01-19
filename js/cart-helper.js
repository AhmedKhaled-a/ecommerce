
function getFromLocalStorage() {
    userCart = JSON.parse(localStorage.getItem("userCart"));
    // console.log(userCart);
}

function updateProduct(e, usrID) {
    let val = e.target.value;
    let productRow = e.target.parentNode.parentNode;
    let productId = productRow.getAttribute("id");
    // console.log(productId);
    let currentSubTotal = e.target.parentNode.nextElementSibling;
    // let allSubTotals = document.querySelectorAll(".subtotal");
    let price = 0;
    // console.log(currentSubTotal);


    // search through userCart with productId
    userCart.every((userProducts) => {
        if(Number(userProducts.userId) == usrID) {
            // update value

            userProducts.products.every((product) => {
                if(productId == product.productId) {
                    product.productQuantity = val;
                    price = product.productPrice;
                    return false; // break
                }
                else {
                    return true; // continue
                }
            });
            return false; // break
        }
    });
    // set local storage
    setLocalStr();

    // update subtotal and total

    // round to two decimal points
    currentSubTotal.innerHTML = (val * price).toFixed(2);
    updateTotalPrice();
}

function removeProduct(e, usrID) {
    // console.log("here");
    let productRow = e.target.parentNode.parentNode;
    // console.log(productRow);
    let productId = productRow.getAttribute("id");
    // remove
    userCart.every((userProducts) => {
        if(Number(userProducts.userId) == usrID) {
            let n = userProducts.products.length;
            for(let i = 0; i < n ; i++ ) {
                let currentProduct = userProducts.products[i];
                if(productId == currentProduct.productId) {
                    productRow.remove();
                    userProducts.products.splice(i, 1);
                    break;
                }
            }

            console.log(userCart);
            
            setLocalStr();
            
        }
    });

    updateTotalPrice();

    
}

function updateTotalPrice() {
    let allSubTotals = document.querySelectorAll(".subtotal");
    let totalEle = document.querySelector("#totalCalc");
    let total = 0;

    allSubTotals.forEach((subTotalE) => {
        // console.log(subTotalE);
        total += Number(subTotalE.innerText);
    });

    totalEle.innerHTML = " $" + total.toFixed(2);

}


function setLocalStr() {
    localStorage.setItem("userCart" , JSON.stringify(userCart));
}

function getLoggedInUser() {
    let userId = JSON.parse(localStorage.getItem("loggedInUser")).userId;
    return userId;

}