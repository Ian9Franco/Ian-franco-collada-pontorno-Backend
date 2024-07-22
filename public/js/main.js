document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    document.getElementById('product-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        socket.emit('addProduct', { name, price });
        document.getElementById('product-form').reset();
    });

    socket.on('updateProducts', (products) => {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - $${product.price}`;
            productList.appendChild(li);
        });
    });
});
