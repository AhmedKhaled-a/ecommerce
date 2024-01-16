allProductsContainer = document.querySelector('.p-container');
async function getProductPage(event) {
    let selectors = ['.product-name', '.product-category', '.price', '.product-stars']
    let productId;

    if (selectors.some(selector => event.target.matches(selector) && !event.target.matches('.addToCart'))) {
        productId = event.target.parentElement.parentElement.id;
    } else if (event.target.matches('img')) {
        productId = event.target.parentElement.id;
    } else if (event.target.matches('.product-card')) {
        productId = event.target.id;
    }

    // Get Product Details
    async function productDetails(id) {
        var response = await fetch(`https://fakestoreapi.com/products/${id}`)
        var result = await response.json()

        return productDetails = {
            'image': result.image,
            'title': result.title,
            'description': result.description,
            'price': result.price,
            'category': result.category,
            'rating': result.rating.rate,
        }
    }
    
    // add the product details with the url
    let params = new URLSearchParams();
    let details = await productDetails(productId);

    params.append('productId', productId);
    params.append('productDetails', JSON.stringify(details))
    location.assign('../product-page.html?' + params.toString())
}

allProductsContainer.addEventListener('click', function(e) {
    getProductPage(e);
})