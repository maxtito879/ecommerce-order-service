import { Order, OrderItem, OrderStatus } from '../models/Order';
import { InventoryRepository } from '../repositories/InventoryRepository';
import { PaymentGateway } from './PaymentGateway';
import { TaxCalculatorService } from './TaxCalculatorService';

export class OrderProcessorService {
    constructor(
        private inventoryRepo: InventoryRepository,
        private paymentGateway: PaymentGateway,
        private taxCalculator: TaxCalculatorService
    ) { }

    async processOrder(customerId: string, items: OrderItem[], countryCode: string): Promise<Order> {
        if (!items || items.length === 0) {
            throw new Error('La orden no contiene productos');
        }

        // 1. Validar e inmovilizar inventario
        for (const item of items) {
            const reserved = await this.inventoryRepo.reserveStock(item.productId, item.quantity);
            if (!reserved) {
                throw new Error(`Stock insuficiente para el producto ${item.productId}`);
            }
        }

        // 2. Calcular subtotal e impuestos
        const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
        const taxAmount = this.taxCalculator.calculateTax(subtotal, countryCode);
        const totalAmount = subtotal + taxAmount;

        const orderId = `ord_${Math.random().toString(36).substr(2, 9)}`;

        // 3. Procesar cobro mediante la pasarela
        const payment = await this.paymentGateway.processPayment(orderId, totalAmount);

        // 4. Retornar estado final de la orden
        return {
            id: orderId,
            customerId,
            items,
            totalAmount,
            taxAmount,
            status: payment.success ? OrderStatus.PAID : OrderStatus.FAILED,
            createdAt: new Date()
        };
    }
}