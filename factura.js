// Realiza una solicitud para obtener datos del archivo 'clientes.json'.
fetch('factura.json')
    .then(response => response.json())  // Convierte la respuesta a formato JSON.
    .then(data => {
        // Mostrar información de pedidos
        const pedidoTable = document.getElementById('facturaTable');
        // Llama a la función mostrarPedidos para cada trimestre y año.
        mostrarFacura(data[2021]['Trimestre1'], pedidoTable);  

    })
    .catch(error => console.error('Error:', error));  // Maneja errores durante la solicitud y los muestra en la consola.

// Función para mostrar detalles de pedidos en una tabla HTML.
function mostrarFacura(data, table) {
    if (data && data.length > 0) {
        // Tomar el primer cliente y su primer pedido como ejemplo
        const cliente = data[0];
        const pedido = cliente.pedidos && cliente.pedidos.length > 0 ? cliente.pedidos[0] : null;

        if (pedido) {
            // Tomar el primer artículo del pedido como ejemplo
            const articulo = pedido.productos && pedido.productos.length > 0 ? pedido.productos[0] : null;

            if (articulo) {
                // Insertar una fila en la tabla con detalles específicos.
                const row = table.insertRow();
                row.innerHTML = `
                    <td>${cliente.nombre} ${cliente.apellidos}</td>
                    <td>${pedido.fecha_compra}</td>
                    <td>${articulo.nombre_producto}</td>
                    <td>${pedido.fecha_compra}</td>
                    <td>${articulo.nombre_producto}</td>
                    <td>${articulo.unidades}</td>
                    <td>${pedido.total_factura}</td>
                `;
            }
        }
    }
}


