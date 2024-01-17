let productsContainer = document.querySelector('.p-container');
let minPrice =  document.querySelector('.range-min');
let maxPrice =  document.querySelector('.range-max');
let all = document.querySelector('.all');
let Electronics = document.querySelector('.electronics');
let Jewelery = document.querySelector('.jewelery');
let Men =document.querySelector('.men');
let Women= document.querySelector('.women');
let search=document.querySelector('.search');
getAllProducts(minPrice.value,maxPrice.value);

minPrice.addEventListener('change',()=>{
    console.log("changing");
    min =  minPrice.value;
    max =  maxPrice.value;
    getAllProducts(min,max)
})
maxPrice.addEventListener('change',()=>{
    console.log("changing");
    min =  minPrice.value;
    max =  maxPrice.value;
    getAllProducts(min,max)
})

all.addEventListener('click',()=>{
    getAllProducts(minPrice.value,maxPrice.value);
})

Electronics.addEventListener('click',()=>{
    getCategory ('electronics');
})

Jewelery.addEventListener('click',()=>{
getCategory('jewelery');
})

Men.addEventListener('click',()=>{
    getCategory("men's clothing");
})

Women.addEventListener('click',()=>{
    getCategory("women's clothing");
})

async function getAllProducts (minPrice,maxPrice) {
    var apiresponse = await fetch('https://fakestoreapi.com/products')
    var finalResult = await apiresponse.json()
    // console.log(finalResult[0]);
    let box = '';
    for (const i of finalResult) {
        if(i.price >= minPrice && i.price < maxPrice)
        {
            box += `
          <div class="col-md-3  p-0 mx-3 rounded product-card" id='${i.id}'>
                        <div class="product-img">
                            <img src="${i.image}" alt="" class="w-100">
                        </div>
                        <div class="p-2">
                            <h2 class="product-name long-text">${i.title}</h2>
                            <p class="product-category text-muted">${i.category}</p>
                            <p class="price fw-semibold">$${i.price}</p>
                            <p class="product-stars">${i.rating.rate}</p>
                        </div>
                        <button class="addToCart"><i class="fa-solid fa-bag-shopping"></i></button>
            </div>
            `
        }
    }
    productsContainer.innerHTML=box;
    addProduct = document.querySelectorAll('.addToCart');
}

async function getCategory (category) {
    var apiresponse = await fetch(`https://fakestoreapi.com/products/category/${category}`)
    var finalResult = await apiresponse.json()
    // console.log(finalResult[0]);
    let box = '';
    for (const i of finalResult) {
        box += `
        <div class="col-md-3  p-0 mx-3 rounded product-card" id='${i.id}'>
                        <div class="product-img">
                            <img src="${i.image}" alt="" class="w-100">
                        </div>
                        <div class="p-2">
                            <h2 class="product-name long-text">${i.title}</h2>
                            <p class="product-category text-muted">${i.category}</p>
                            <p class="price fw-semibold">$${i.price}</p>
                            <p class="product-stars">${i.rating.rate}</p>
                        </div>
                        <button class="addToCart"><i class="fa-solid fa-bag-shopping"></i></button>
            </div>
            `
    }
    productsContainer.innerHTML=box;
    document.querySelectorAll('.addToCart');
}


async function searchProduct (match) {
    var apiresponse = await fetch(`https://fakestoreapi.com/products/`)
    var finalResult = await apiresponse.json()
    // console.log(finalResult[0]);
    let box = '';
    for (const i of finalResult) {
        if(i.title.toLowerCase().includes(match.toLowerCase())){

        
        box += `
        <div class="col-md-3  p-0 mx-3 rounded product-card" id='${i.id}'>
        <div class="product-img">
            <img src="${i.image}" alt="" class="w-100">
        </div>
        <div class="p-2">
            <h2 class="product-name">${i.title}</h2>
            <p class="product-category text-muted">${i.category}</p>
            <p class="price fw-semibold">$${i.price}</p>
            <p class="product-stars">${i.rating.rate}</p>
        </div>
        <button class="addToCart"><i class="fa-solid fa-bag-shopping"></i></button>
        </div> 
        `
    }
    productsContainer.innerHTML=box;
}}

search.addEventListener('input',()=>{
    searchProduct(search.value);
})