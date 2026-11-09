export class InventoryRepository {
    private stock: Map<string, number> = new Map([
        ['prod-1', 10],
        ['prod-2', 5],
    ]);

    async getStock(productId: string): Promise<number> {
        return this.stock.get(productId) ?? 0;
    }

    async reserveStock(productId: string, quantity: number): Promise<boolean> {
        const currentStock = await this.getStock(productId);
        if (currentStock < quantity) return false;
        this.stock.set(productId, currentStock - quantity);
        return true;
    }
}