fetch('producto.json')
    .then(response => response.json())
    .then(data => {
        const pedidoTable = document.getElementById('productosVendidosTable');
        mostrarProductos(data[2021]['Trimestre1'], pedidoTable);
        mostrarProductos(data[2022]['Trimestre4'], pedidoTable);
    })
    .catch(error => console.error('Error:', error));

function mostrarProductos(data, table) {
    if (data && Array.isArray(data) && data.length > 0) {
        data.forEach(cliente => {
            if (cliente.pedidos && Array.isArray(cliente.pedidos)) {
                cliente.pedidos.forEach(pedido => {
                    if (pedido.productos && Array.isArray(pedido.productos)) {
                        pedido.productos.forEach(articulo => {
                            const row = table.insertRow();
                            row.innerHTML = `
                                <td>${articulo.nombre_producto}</td>
                                <td>${cliente.nombre} ${cliente.apellidos}</td>
                                <td>${pedido.fecha_compra}</td>
                                <td>${articulo.unidades}</td>
                                <td>${pedido.total_factura}</td>
                            `;
                        });
                    }
                });
            }
        });
    }
}

