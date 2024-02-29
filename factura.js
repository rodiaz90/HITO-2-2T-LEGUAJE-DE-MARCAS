fetch('factura.json')
    .then(response => response.json())
    .then(data => {
        const pedidoTable = document.getElementById('facturaTable');
        mostrarFacura(data[2021]['Trimestre1'], pedidoTable);  
    })
    .catch(error => console.error('Error:', error));

function mostrarFacura(data, table) {
    if (data && data.length > 0) {
        const cliente = data[0];
        const pedido = cliente.pedidos && cliente.pedidos.length > 0 ? cliente.pedidos[0] : null;

        if (pedido) {
            const articulo = pedido.productos && pedido.productos.length > 0 ? pedido.productos[0] : null;

            if (articulo) {
                const row = table.insertRow();
                row.innerHTML = `
                    <td>${cliente.nombre} ${cliente.apellidos}</td>
                    <td>${pedido.fecha_compra}</td>
                    <td>${articulo.nombre_producto}</td>    
                    <td>${articulo.unidades}</td>
                    <td>${pedido.total_factura}</td>
                `;
            }
        }
    }
}


