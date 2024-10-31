import { NextRequest, NextResponse } from 'next/server';

import Contracts from '@/class/HyperAgileContracts';
import Firebase from '@/services/Database';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.orderId) throw new Error('No order id was provided');
        if (!body.robotId) throw new Error('No robot id was provided');

        const customer = await Contracts.getOrderSender(body.orderId);

        const firebase = new Firebase();
        const order = await firebase.getOrder(customer, body.orderId);

        let hash;
        if (body.robotId == 1) hash = await Contracts.pickOrder(body.orderId);
        else if (body.robotId == 2) hash = await Contracts.packOrder(body.orderId);
        else hash = await Contracts.deliverOrder(body.orderId);

        order.hashes[(body.robotId - 1) * 2 + 3] = hash;
        if (body.robotId == 3) order.status = 'completed';

        await firebase.updateOrder(customer, order);

        return NextResponse.json({}, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
