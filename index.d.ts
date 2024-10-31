export {};

declare global {
    type OffChainStock = {
        onHold: number;
        stock: number;
    };

    interface Product {
        id: number;
        name: string;
        image: string;
        uri: string;
        price: number;
        stock: number;
    }

    interface Order {
        orderId: string;
        status: 'processing' | 'completed' | 'cancelled';

        productName: string;
        productId: id;
        productImage: string;

        mailingInfo: {
            name: string;
            phone: string;
            address: string;
        };

        hashes: string[];
        robots: number[];

        timestamp: number;
        url?: string;
    }

    type SimulatorStatus = 'processing' | 'picking' | 'packing' | 'delivery' | 'completed';

    type ConnectionMethod = undefined | 'petra' | 'google';

    type BoxColor = 'purple' | 'green' | 'blue';
}
