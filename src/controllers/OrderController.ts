import { OrderProcessorService } from '../services/OrderProcessorService';
import { OrderItem } from '../models/Order';

export class OrderController {
    constructor(private orderProcessor: OrderProcessorService) { }

    async handleCreateOrder(reqBody: { customerId: string; items: OrderItem[]; country: string }) {
        try {
            const order = await this.orderProcessor.processOrder(
                reqBody.customerId,
                reqBody.items,
                reqBody.country
            );
            return { statusCode: 200, body: order };
        } catch (error: any) {
            return {
                statusCode: 400,
                body: { error: error.message || 'Error al procesar la orden' }
            };
        }
    }
}