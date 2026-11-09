export class TaxCalculatorService {
    private taxRates: Record<string, number> = {
        MX: 0.16, // IVA México
        US: 0.08, // Tax USA
        ES: 0.21  // IVA España
    };

    calculateTax(amount: number, countryCode: string): number {
        if (amount <= 0) throw new Error('El monto debe ser mayor a 0');
        const rate = this.taxRates[countryCode.toUpperCase()] ?? 0.10;
        return Number((amount * rate).toFixed(2));
    }
}