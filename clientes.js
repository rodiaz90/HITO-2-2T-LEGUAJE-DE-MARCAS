// Realiza una solicitud para obtener datos del archivo 'clientes.json'.
fetch('clientes.json')
    .then(response => response.json())  // Convierte la respuesta a formato JSON.
    .then(data => {
        // Mostrar información de pedidos
        const pedidoTable = document.getElementById('pedidoTable');
        // Llama a la función mostrarPedidos para cada trimestre y año.
        mostrarPedidos(data[2021]['Trimestre1'], pedidoTable);
        mostrarPedidos(data[2021]['Trimestre2'], pedidoTable);
        mostrarPedidos(data[2021]['Trimestre3'], pedidoTable);
        mostrarPedidos(data[2021]['Trimestre4'], pedidoTable);
        mostrarPedidos(data[2022]['Trimestre1'], pedidoTable);
        mostrarPedidos(data[2022]['Trimestre2'], pedidoTable);
        mostrarPedidos(data[2022]['Trimestre3'], pedidoTable);
        mostrarPedidos(data[2022]['Trimestre4'], pedidoTable);

        // Mostrar información de clientes
        const clienteTable = document.getElementById('clienteTable');
        // Llama a la función mostrarClientes para mostrar información de clientes.
        mostrarClientes(data[2021]['Trimestre1'], clienteTable);
    })
    .catch(error => console.error('Error:', error));  // Maneja errores durante la solicitud y los muestra en la consola.

// Función para mostrar detalles de pedidos en una tabla HTML.
function mostrarPedidos(data, table) {
    if (data) {
        // Itera sobre clientes y pedidos.
        data.forEach(cliente => {
            if (cliente.pedidos) {
                // Itera sobre los pedidos del cliente.
                cliente.pedidos.forEach(pedido => {
                    // Inserta filas en la tabla con detalles de pedidos y productos.
                    const row = table.insertRow();
                    row.innerHTML = `
                        <td>${cliente.nombre} ${cliente.apellidos}</td>
                        <td>${pedido.numero_pedido}</td>
                        <td>${pedido.fecha_compra}</td>
                        <td>${pedido.fecha_entrega}</td>
                        <td>${pedido.total_factura}</td>
                        <td>${pedido.productos.map(producto => producto.nombre_producto).join('<br>')}</td>
                        <td>${pedido.productos.map(producto => producto.referencia).join('<br>')}</td>
                        <td>${pedido.productos.map(producto => producto.precio).join('<br>')}</td>
                        <td>${pedido.productos.map(producto => producto.unidades).join('<br>')}</td>
                    `;
                });
            }
        });
    }
}

// Función para mostrar detalles de clientes en una tabla HTML.
function mostrarClientes(data, table) {
    if (data) {
        // Itera sobre clientes e inserta filas en la tabla con detalles de clientes.
        data.forEach(cliente => {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${cliente.nombre} ${cliente.apellidos}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.direccion.calle}, ${cliente.direccion.ciudad}, ${cliente.direccion.codigo_postal}, ${cliente.direccion.provincia}</td>
                <td>${cliente.correo_electronico}</td>
                <td>${cliente.fecha_inclusion}</td>
            `;
        });
    }
}



