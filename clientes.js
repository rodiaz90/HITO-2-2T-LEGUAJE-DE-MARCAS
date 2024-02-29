fetch('clientes.json')
    .then(response => response.json())
    .then(data => {
        const pedidoTable = document.getElementById('pedidoTable');
        mostrarPedidos(data[2021]['Trimestre1'], pedidoTable);
        mostrarPedidos(data[2021]['Trimestre2'], pedidoTable);
        mostrarPedidos(data[2021]['Trimestre3'], pedidoTable);
        mostrarPedidos(data[2021]['Trimestre4'], pedidoTable);
        mostrarPedidos(data[2022]['Trimestre1'], pedidoTable);
        mostrarPedidos(data[2022]['Trimestre2'], pedidoTable);
        mostrarPedidos(data[2022]['Trimestre3'], pedidoTable);
        mostrarPedidos(data[2022]['Trimestre4'], pedidoTable);

        const clienteTable = document.getElementById('clienteTable');
        mostrarClientes(data[2021]['Trimestre1'], clienteTable);
    })
    .catch(error => console.error('Error:', error));

function mostrarPedidos(data, table) {
    if (data) {
        data.forEach(cliente => {
            if (cliente.pedidos) {
                cliente.pedidos.forEach(pedido => {
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

function mostrarClientes(data, table) {
    if (data) {
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



