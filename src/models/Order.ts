export interface OrderItem {
    productId: string;
    quantity: number;
    unitPrice: number;
}

export enum OrderStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED'
}

export interface Order {
    id: string;
    customerId: string;
    items: OrderItem[];
    totalAmount: number;
    taxAmount: number;
    status: OrderStatus;
    createdAt: Date;
}