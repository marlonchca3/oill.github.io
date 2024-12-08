function calculateFinalPrice() {
    // Get input values
    const barrelCost = parseFloat(document.getElementById('materiaPrima').value);
    const crudeType = document.getElementById('tipoCreudo').value;
    const profitMargin = parseFloat(document.getElementById('margenGanancia').value);
    const taxRate = parseFloat(document.getElementById('impuesto').value);
    const estimatedBarrels = parseInt(document.getElementById('ventasEsperadas').value);

    // Validate data
    if (isNaN(barrelCost) || isNaN(profitMargin) || 
        isNaN(taxRate) || isNaN(estimatedBarrels)) {
        alert("Please fill in all fields with valid numerical values");
        return;
    }

    // Adjustment factor based on crude type
    let adjustmentFactor = 1;
    switch(crudeType) {
        case 'light':
            adjustmentFactor = 1.1; // 10% premium for light crude
            break;
        case 'medium':
            adjustmentFactor = 1;
            break;
        case 'heavy':
            adjustmentFactor = 0.9; // 10% discount for heavy crude
            break;
    }

    // Calculations
    const adjustedCost = barrelCost * adjustmentFactor;
    const profitAmount = adjustedCost * (profitMargin / 100);
    const subtotal = adjustedCost + profitAmount;
    const tax = subtotal * (taxRate / 100);
    const finalPrice = subtotal + tax;
    const totalProfit = profitAmount * estimatedBarrels;

    // Display results
    const results = document.getElementById('resultados');
    results.style.display = 'block';
    results.classList.add('visible');

    document.getElementById('costoPrima').textContent = `Cost per barrel: USD ${adjustedCost.toFixed(2)}`;
    document.getElementById('tipoSeleccionado').textContent = `Crude type: ${crudeType.charAt(0).toUpperCase() + crudeType.slice(1)}`;
    document.getElementById('margenCalculado').textContent = `Profit per barrel: USD ${profitAmount.toFixed(2)}`;
    document.getElementById('subtotal').textContent = `Subtotal per barrel: USD ${subtotal.toFixed(2)}`;
    document.getElementById('impuestoCalculado').textContent = `Tax amount: USD ${tax.toFixed(2)}`;
    document.getElementById('precioFinal').textContent = `Final price per barrel: USD ${finalPrice.toFixed(2)}`;
    document.getElementById('proyeccionVentas').textContent = `Estimated barrels: ${estimatedBarrels}`;
    document.getElementById('gananciaTotal').textContent = `Total estimated profit: USD ${totalProfit.toFixed(2)}`;
}

// Additional business functions
class OilBusinessCalculator {
    // For Distributors
    static calculateWholesalePrice(volume, basePrice) {
        let volumeDiscount = 0;
        if (volume > 1000) volumeDiscount = 0.05;
        if (volume > 5000) volumeDiscount = 0.10;
        return basePrice * (1 - volumeDiscount);
    }

    // For Service Stations
    static calculateCompetitivePrice(competitorPrices, operatingCosts) {
        const averageMarketPrice = competitorPrices.reduce((a, b) => a + b) / competitorPrices.length;
        const minimumViablePrice = operatingCosts * 1.1; // 10% minimum margin
        return Math.max(averageMarketPrice * 0.98, minimumViablePrice);
    }

    // For Transport Companies
    static calculateOperatingCost(distance, fuelConsumption, maintenanceCost) {
        const fuelCost = (distance * fuelConsumption);
        return fuelCost + maintenanceCost;
    }

    // Market Analysis
    static analyzePriceTrend(historicalPrices) {
        const trend = historicalPrices.slice(-30); // Last 30 days
        return {
            average: trend.reduce((a, b) => a + b) / trend.length,
            trend: trend[trend.length - 1] > trend[0] ? 'Upward' : 'Downward'
        };
    }
} 