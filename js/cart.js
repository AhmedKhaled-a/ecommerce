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
                    let price = Number(productItem.productPrice);
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
                totalCalculated.innerText = total.toFixed(2);
                // console.log(total);
            }
            return;
        });
    }
}


function init() {
    getFromLocalStorage();
    renderProducts(getLoggedInUser()); 
}

function goToCheckout() {
    let usrID = getLoggedInUser();
    if(userCart != null) {
        userCart.forEach((userProducts) => {
            // console.log(typeof(userProducts));
            if(Number(userProducts.userId) == usrID) {
                if(userProducts.products.length != 0) {
                    window.location.replace('./checkout.html');

                }
                else {
                    alert("No thing to checkout");
                    return;
                }
            }
        });
    }
}


init();

