

const sidebar = document.querySelector('.sidebar'),
    toggle = document.querySelector('.toggle-sidebar'),
    toggle2 = document.querySelector('#cart-slider-toggle');

toggle.addEventListener('click', () => {
    sidebar.classList.toggle('closed')
})

toggle2.addEventListener('click', (e) => {
    sidebar.classList.toggle('closed')
})
