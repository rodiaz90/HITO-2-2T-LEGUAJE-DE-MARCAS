// Realiza una solicitud para obtener datos del archivo 'producto.json'.
fetch('producto.json')
    .then(response => response.json())  // Convierte la respuesta a formato JSON.
    .then(data => {
        // Mostrar información de productos vendidos
        const productoTable = document.getElementById('productosVendidosTable');
        // Llama a la función mostrarProductos para mostrar productos vendidos en el primer trimestre de 2020 y último de 2021.
        mostrarProductos(data, productoTable);
    })
    .catch(error => console.error('Error:', error));  // Maneja errores durante la solicitud y los muestra en la consola.

// Función para mostrar detalles de productos vendidos en una tabla HTML.
function mostrarProductos(data, table) {
    if (data) {
        // Obtener productos del primer trimestre de 2020 y del último de 2021.
        const productos2020 = data[2021] && data[2021]['Trimestre1'] ? data[2021]['Trimestre1'] : [];
        const productos2021 = data[2022] && data[2022]['Trimestre4'] ? data[2022]['Trimestre4'] : [];

        // Concatenar productos de ambos trimestres.
        const productosTotales = productos2020.concat(productos2021);

        // Iterar sobre productos e insertar filas en la tabla con detalles de productos vendidos.
        productosTotales.forEach(producto => {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.nombre_producto}</td>
                <td>${producto.precio}</td>
                <td>${producto.unidades}</td>
            `;
        });
    }
} 

