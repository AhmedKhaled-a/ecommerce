const tableBody = document.querySelector("tbody");
const totalCalculated = document.getElementById("totalCalc");
// console.log(tableBody);

let products = [] // TODO: get from Local Storage

function testStoreProduct(usrID) {
    products.push(
        {
            [usrID]: 
            [
                {
                    productID: 2,
                    quantity: 1
                },
                {
                    productID: 1,
                    quantity: 4
                },
                {
                    productID: 3,
                    quantity: 7
                }
            ]
        }
    )

    products.push(

        {"1": [
            {
                productID: 2,
                quantity: 3
            },
            {
                productID: 3,
                quantity: 3
            },
            {
                productID: 1,
                quantity: 3
            }
        ]}
        )

    localStorage.setItem("products" , JSON.stringify(products));
}


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

    products.forEach((userProducts) => {
        // console.log(typeof(userProducts));
        let total = 0;
        if(Number(Object.keys(userProducts)[0]) == usrID) {
            userProducts[`${usrID}`].forEach((productItem) => {
                console.log(productItem);
                let corespondingProduct = gAllProducts[productItem.productID - 1];
                let price = Number(corespondingProduct.price);
                // tr
                productRow = document.createElement("tr");
                // title
                productTitle = document.createElement("td");
                

                // title image
                titleImage = document.createElement("img");
                titleImage.className = "mx-6";
                titleImage.setAttribute("src" , corespondingProduct.image);
                productTitle.insertAdjacentElement("beforeend" , titleImage);
                productTitle.insertAdjacentElement("beforeend" , document.createElement("br"));

                // title link 
                titleLink = document.createElement("a");
                titleLink.className = "mx-6";
                titleLink.innerHTML = corespondingProduct.title;
                productTitle.insertAdjacentElement("beforeend" , titleLink);
                productRow.insertAdjacentElement("afterbegin",productTitle );

                // remove icon
                removeIcon = document.createElement("i");
                removeIcon.className = "fa-regular fa-circle-xmark mx-4 fs-4";
                
                productTitle.insertAdjacentElement("afterbegin", removeIcon);
                // price
                priceCol = document.createElement("td");
                priceCol.innerText = price;
                productRow.insertAdjacentElement("beforeend", priceCol);

                quantityCol = document.createElement("td");
                quantityInput = document.createElement("input");
                quantityInput.setAttribute("type" , "number");
                quantityInput.setAttribute("min" , "0");
                quantityInput.setAttribute("max" , "10");

                quantityInput.setAttribute("value" , productItem.quantity);
                quantityCol.appendChild(quantityInput);
                productRow.insertAdjacentElement("beforeend", quantityCol);
                subTotal = document.createElement("td");
                subTotal.innerText = Number(productItem.quantity) * price;
                total += Number(productItem.quantity) * price;
                productRow.insertAdjacentElement("beforeend", subTotal);

                tableBody.insertAdjacentElement("afterbegin" , productRow);
            });
            totalCalculated.innerText = total;
            // console.log(total);
        }
        return;
    });

}
function getFromLocalStorage() {
    products = JSON.parse(localStorage.getItem("products"));
    console.log(products);
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

function init() {
    testStoreProduct(0); // /just for testing
    getFromLocalStorage();
    renderProducts(0);
}

init();

