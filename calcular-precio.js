const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para preguntar al usuario y obtener respuesta
function pregunta(pregunta) {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => {
            resolve(respuesta);
        });
    });
}

// Función principal usando async/await
async function calcularPrecioFinal() {
    try {
        // Solicitar datos al usuario
        const costoMateriaPrima = parseFloat(await pregunta("Ingrese el costo de la materia prima: "));
        const margenGananciaPorcentaje = parseFloat(await pregunta("Ingrese el porcentaje de ganancia deseado (ejemplo: 30): "));
        const impuestoPorcentaje = parseFloat(await pregunta("Ingrese el porcentaje de impuestos (ejemplo: 16): "));

        // Validar que los datos sean números válidos
        if (isNaN(costoMateriaPrima) || isNaN(margenGananciaPorcentaje) || isNaN(impuestoPorcentaje)) {
            console.log("Por favor, ingrese valores numéricos válidos");
            rl.close();
            return;
        }

        // Calcular el margen de ganancia
        const margenGanancia = costoMateriaPrima * (margenGananciaPorcentaje / 100);
        
        // Calcular el subtotal
        const subtotal = costoMateriaPrima + margenGanancia;
        
        // Calcular el impuesto
        const impuesto = subtotal * (impuestoPorcentaje / 100);
        
        // Calcular el precio final
        const precioFinal = subtotal + impuesto;

        // Mostrar resultados
        console.log("\n=== Desglose del Precio ===");
        console.log(`Costo de materia prima: $${costoMateriaPrima.toFixed(2)}`);
        console.log(`Margen de ganancia: $${margenGanancia.toFixed(2)}`);
        console.log(`Subtotal: $${subtotal.toFixed(2)}`);
        console.log(`Impuesto: $${impuesto.toFixed(2)}`);
        console.log(`Precio final: $${precioFinal.toFixed(2)}`);

        // Calcular ganancia esperada
        const ventasEsperadas = parseInt(await pregunta("¿Cuántas ventas espera realizar? "));
        
        if (isNaN(ventasEsperadas)) {
            console.log("Por favor, ingrese un número válido de ventas");
            rl.close();
            return;
        }

        const gananciaTotal = margenGanancia * ventasEsperadas;

        console.log("\n=== Proyección de Ganancias ===");
        console.log(`Ventas esperadas: ${ventasEsperadas} unidades`);
        console.log(`Ganancia total esperada: $${gananciaTotal.toFixed(2)}`);

        rl.close();
    } catch (error) {
        console.log("Ocurrió un error:", error);
        rl.close();
    }
}

// Ejecutar la aplicación
calcularPrecioFinal();