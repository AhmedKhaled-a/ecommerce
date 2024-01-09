
const sidebar = document.querySelector('.sidebar'),
    toggle = document.querySelector('.toggle-sidebar');

toggle.addEventListener('click', () => {
    sidebar.classList.toggle('closed')
})
