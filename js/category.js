let producsContainer = document.querySelector('.p-container');
let priceRange = document.querySelector('input[type=range]');
let price =  priceRange.value;
let maxPrice =  priceRange.getAttribute('max');
let category = document.querySelector('.cat')
let categoryCounter = document.querySelector('.catCounter')
getAllProducts(price,maxPrice)

priceRange.addEventListener('change',()=>{
    price =  priceRange.value;
    maxPrice =  priceRange.getAttribute('max');
    getAllProducts(price,maxPrice)
})
category.addEventListener('click',(e)=>{
    getCategory (e.target.innerHTML)
})

async function getAllProducts (price,maxPrice) {
    var apiresponse = await fetch('https://fakestoreapi.com/products')
    var finalResult = await apiresponse.json()
    // console.log(finalResult[0]);
    let box = '';
    for (const i of finalResult) {
        if(i.price >= price && i.price < maxPrice)
        {
            box += `
            <div class="product-card">
            <img src="${i.image}">
            <div>
            <p class="product-name">${i.title}</p>
            <p class="product-category">${i.category}</p>
            <p class="product-price">${i.price}</p>
            <p class="product-stars">${i.rating.rate}</p>
            </div>
          </div>
            `
        }
    }
    producsContainer.innerHTML=box;
}

async function getCategory (category) {
    var apiresponse = await fetch(`https://fakestoreapi.com/products/category/${category}`)
    var finalResult = await apiresponse.json()
    // console.log(finalResult[0]);
    let box = '';
    for (const i of finalResult) {
        box += `
            <div class="product-card">
            <img src="${i.image}">
            <div>
            <p class="product-name">${i.title}</p>
            <p class="product-category">${i.category}</p>
            <p class="product-price">${i.price}</p>
            <p class="product-stars">${i.rating.rate}</p>
            </div>
          </div>
            `
    }
    producsContainer.innerHTML=box;
}


