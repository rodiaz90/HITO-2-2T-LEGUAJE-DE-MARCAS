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

        // Crear factura de un cliente (Tomar el primer cliente como ejemplo)
        const facturaDiv = document.getElementById('factura');
        // Llama a la función mostrarFactura para crear una factura de ejemplo.
        mostrarFactura(data[2021]['Trimestre1'][0].pedidos[0], facturaDiv);

        // Mostrar productos vendidos en los trimestres especificados
        const productosVendidosTable = document.getElementById('productosVendidosTable');
        // Llama a la función mostrarProductosVendidos para mostrar productos vendidos.
        mostrarProductosVendidos(data, productosVendidosTable);
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

// Función para mostrar detalles de factura en una tabla HTML.
function mostrarFactura(data, table) {
    // Verifica si hay datos disponibles.
    if (data) {
        // Itera sobre cada pedido en los datos.
        data.forEach(pedido => {
            // Verifica si hay productos en el pedido.
            if (pedido.productos) {
                // Itera sobre cada producto en los productos del pedido.
                pedido.productos.forEach(producto => {
                    // Crea una nueva fila en la tabla.
                    const row = table.insertRow();
                    // Inserta celdas en la fila con los detalles del cliente, pedido y producto.
                    row.innerHTML = `
                        <td>${pedido.cliente.nombre} ${pedido.cliente.apellidos}</td>
                        <td>${pedido.numero_pedido}</td>
                        <td>${pedido.fecha_compra}</td>
                        <td>${pedido.fecha_entrega}</td>
                        <td>${pedido.total_factura}</td>
                        <td>${producto.nombre_producto}</td>
                        <td>${producto.referencia}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.unidades}</td>
                    `;
                });
            }
        });
    }
}


// Función para mostrar productos vendidos en una tabla HTML.
function mostrarProductosVendidos(data, table) {
    const tbody = table.querySelector('tbody');
    if (data) {
        // Itera sobre años y trimestres para mostrar productos vendidos.
        const trimestres = Object.keys(data);
        trimestres.forEach(año => {
            Object.values(data[año]).forEach(trimestre => {
                if (trimestre && trimestre.pedidos) {
                    trimestre.pedidos.forEach(pedido => {
                        if (pedido && pedido.productos) {
                            // Itera sobre productos del pedido.
                            pedido.productos.forEach(producto => {
                                const row = document.createElement('tr');
                                row.innerHTML = `
                                    <td>${pedido.cliente.nombre} ${pedido.cliente.apellidos}</td>
                                    <td>${pedido.numero_pedido}</td>
                                    <td>${pedido.fecha_compra}</td>
                                    <td>${pedido.fecha_entrega}</td>
                                    <td>${pedido.total_factura}</td>
                                    <td>${producto.nombre_producto}</td>
                                    <td>${producto.referencia}</td>
                                    <td>${producto.precio}</td>
                                    <td>${producto.unidades}</td>
                                `;
                                tbody.appendChild(row);
                            });
                        }
                    });
                }
            });
        });
    }
}


