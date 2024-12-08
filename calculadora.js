function calcularPrecioFinal() {
    // Obtener valores de los inputs
    const costoBarril = parseFloat(document.getElementById('materiaPrima').value);
    const tipoCreudo = document.getElementById('tipoCreudo').value;
    const margenGananciaPorcentaje = parseFloat(document.getElementById('margenGanancia').value);
    const impuestoPorcentaje = parseFloat(document.getElementById('impuesto').value);
    const barrilesEstimados = parseInt(document.getElementById('ventasEsperadas').value);

    // Validar datos
    if (isNaN(costoBarril) || isNaN(margenGananciaPorcentaje) || 
        isNaN(impuestoPorcentaje) || isNaN(barrilesEstimados)) {
        alert("Por favor, complete todos los campos con valores numéricos válidos");
        return;
    }

    // Factor de ajuste según tipo de crudo
    let factorAjuste = 1;
    switch(tipoCreudo) {
        case 'ligero':
            factorAjuste = 1.1; // 10% adicional por ser crudo ligero
            break;
        case 'medio':
            factorAjuste = 1;
            break;
        case 'pesado':
            factorAjuste = 0.9; // 10% menos por ser crudo pesado
            break;
    }

    // Realizar cálculos
    const costoAjustado = costoBarril * factorAjuste;
    const margenGanancia = costoAjustado * (margenGananciaPorcentaje / 100);
    const subtotal = costoAjustado + margenGanancia;
    const impuesto = subtotal * (impuestoPorcentaje / 100);
    const precioFinal = subtotal + impuesto;
    const gananciaTotal = margenGanancia * barrilesEstimados;

    // Mostrar resultados
    const resultados = document.getElementById('resultados');
    resultados.style.display = 'block';
    resultados.classList.add('visible');

    document.getElementById('costoPrima').textContent = `Costo por barril: USD ${costoAjustado.toFixed(2)}`;
    document.getElementById('tipoSeleccionado').textContent = `Tipo de crudo: ${tipoCreudo.charAt(0).toUpperCase() + tipoCreudo.slice(1)}`;
    document.getElementById('margenCalculado').textContent = `Margen de ganancia por barril: USD ${margenGanancia.toFixed(2)}`;
    document.getElementById('subtotal').textContent = `Subtotal por barril: USD ${subtotal.toFixed(2)}`;
    document.getElementById('impuestoCalculado').textContent = `Impuestos: USD ${impuesto.toFixed(2)}`;
    document.getElementById('precioFinal').textContent = `Precio final por barril: USD ${precioFinal.toFixed(2)}`;
    document.getElementById('proyeccionVentas').textContent = `Barriles estimados: ${barrilesEstimados}`;
    document.getElementById('gananciaTotal').textContent = `Ganancia total estimada: USD ${gananciaTotal.toFixed(2)}`;
}