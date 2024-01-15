const tableBody = document.querySelector("tbody");
const totalCalculated = document.getElementById("totalCalc");
// console.log(tableBody);

let userCart = [] // TODO: get from Local Storage

function renderProducts(usrID) {
    let productRow;
    let productTitle;
    let removeIcon;
    let priceCol;
    let titleImage;
    let titleLink;
    let quantityCol;
    let quantityInput;
    let subTotal;
// [{"userId":2,"products":[{"productId":"1","productName":"DNK Yellow Shoes","ProductImg":"http://127.0.0.1:5502/imgs/product-1.jpg","productPrice":"120.00","productQuantity":7}]}]
    if(userCart != null) {
        userCart.forEach((userProducts) => {
            // console.log(typeof(userProducts));
            let total = 0;
            if(Number(userProducts.userId) == usrID) {
                userProducts.products.forEach((productItem) => {
                    // console.log(productItem);
                    // let corespondingProduct = gAllProducts[productItem.productID - 1];
                    let price = productItem.productPrice;
                    // tr
                    productRow = document.createElement("tr");
                    // title
                    productTitle = document.createElement("td");
                    

                    // title image
                    titleImage = document.createElement("img");
                    titleImage.className = "mx-6";
                    titleImage.setAttribute("src" , productItem.ProductImg);
                    productTitle.insertAdjacentElement("beforeend" , titleImage);
                    productTitle.insertAdjacentElement("beforeend" , document.createElement("br"));

                    // title link 
                    titleLink = document.createElement("a");
                    titleLink.className = "mx-6";
                    titleLink.innerHTML = productItem.productName;
                    productTitle.insertAdjacentElement("beforeend" , titleLink);
                    productRow.insertAdjacentElement("afterbegin",productTitle );

                    // remove icon
                    removeIcon = document.createElement("i");
                    removeIcon.className = "fa-regular fa-circle-xmark mx-4 fs-4";
                    // add event listener
                    removeIcon.addEventListener("click", (e) => removeProduct(e,usrID));

                    productTitle.insertAdjacentElement("afterbegin", removeIcon);
                    // price
                    priceCol = document.createElement("td");
                    priceCol.innerText = price;
                    productRow.insertAdjacentElement("beforeend", priceCol);

                    quantityCol = document.createElement("td");
                    quantityInput = document.createElement("input");
                    // add onchange listener
                    quantityInput.addEventListener("change", (e) => updateProduct(e,usrID));
                    quantityInput.setAttribute("type" , "number");
                    quantityInput.setAttribute("min" , "1");
                    quantityInput.setAttribute("max" , "10");

                    quantityInput.setAttribute("value" , productItem.productQuantity);
                    quantityCol.appendChild(quantityInput);
                    productRow.insertAdjacentElement("beforeend", quantityCol);
                    subTotal = document.createElement("td");
                    subTotal.setAttribute("class" , "subtotal");
                    subTotal.innerText = Number(productItem.productQuantity) * price;
                    total += Number(productItem.productQuantity) * price;
                    productRow.insertAdjacentElement("beforeend", subTotal);
                    productRow.setAttribute("id" , productItem.productId);
                    // the most recent (last in storage) is first in list
                    tableBody.insertAdjacentElement("afterbegin" , productRow);
                });
                totalCalculated.innerText = total;
                // console.log(total);
            }
            return;
        });
    }

}
function getFromLocalStorage() {
    userCart = JSON.parse(localStorage.getItem("userCart"));
    // console.log(userCart);
}
/*
<tr>
    <td>
        <i class="fa-regular fa-circle-xmark mx-4 fs-4"></i>
        <img class="mx-5" src="imgs/product-accessory2-300x300.jpg" alt=""  /> <br>
       
    </td>
    <td>$150.00</td>
    <td><input type="number" min="0" max="10" value="0" /></td>
    <td>$150.00</td>
</tr>
*/


function updateProduct(e, usrID) {
    let val = e.target.value;
    let productRow = e.target.parentNode.parentNode;
    let productId = productRow.getAttribute("id");
    console.log(productId);
    let currentSubTotal = e.target.parentNode.nextElementSibling;
    // let allSubTotals = document.querySelectorAll(".subtotal");
    let price = 0;
    let total = 0;
    // console.log(currentSubTotal);


    // search through userCart with productId
    userCart.every((userProducts) => {
        if(Number(userProducts.userId) == usrID) {
            // update value

            userProducts.products.every((product) => {
                // console.log(product);
                if(productId == product.productId) {
                    product.productQuantity = val;
                    price = product.productPrice;
                    // console.log(price);
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

    currentSubTotal.innerHTML = val * price;

    updateTotalPrice();



}

function removeProduct(e, usrID) {
    // console.log("here");
    let productRow = e.target.parentNode.parentNode;
    console.log(productRow);
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

    totalEle.innerHTML = total;

}

function setLocalStr() {
    localStorage.setItem("userCart" , JSON.stringify(userCart));
}

function init() {
    getFromLocalStorage();
    // console.log(userCart);
    renderProducts(2); // 2 for userId
}


init();

