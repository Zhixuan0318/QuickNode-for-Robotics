import { NextRequest, NextResponse } from 'next/server';

import Firebase from '@/services/Database';
import Contracts from '@/class/HyperAgileContracts';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body.orderId) throw new Error('No order was provided');

        await new Promise((resolve) => setTimeout(resolve, 7_000));

        const customer = await Contracts.getOrderSender(body.orderId);

        const firebase = new Firebase();
        const order = await firebase.getOrder(customer, body.orderId);
        order.hashes[1] = await Contracts.processOrder(body.orderId);
        order.hashes.push('empty');
        await firebase.updateOrder(customer, order);

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: `Error - ${error}` }, { status: 500 });
    }
}
