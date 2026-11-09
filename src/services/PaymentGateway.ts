export interface PaymentResult {
    success: boolean;
    transactionId?: string;
    errorMessage?: string;
}

export class PaymentGateway {
    async processPayment(orderId: string, amount: number): Promise<PaymentResult> {
        if (amount <= 0) {
            return { success: false, errorMessage: 'Monto inválido' };
        }
        // Simulación de procesamiento de pago
        return { success: true, transactionId: `tx_${Date.now()}` };
    }
}