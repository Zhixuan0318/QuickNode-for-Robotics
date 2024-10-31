import { NextRequest, NextResponse } from 'next/server';

import Firebase from '@/services/Database';
import Contracts from '@/class/HyperAgileContracts';

import { sendSimulationRequest } from '@/utils/sendQuickNodeFunction';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body.orderId) throw new Error('No order was provided');
        if (body.stage == undefined) throw new Error('No stage was provided');
        if (body.robotId == undefined) throw new Error('No robot id was provided');
        if (!body.hash) throw new Error('No hash was provided');

        console.log(body);

        const customer = await Contracts.getOrderSender(body.orderId);

        const firebase = new Firebase();
        const order = await firebase.getOrder(customer, body.orderId);

        if (order.hashes.length > body.stage * 2 + 3) return NextResponse.json({}, { status: 200 });

        order.hashes[body.stage * 2 + 2] = body.hash;
        order.robots[body.stage] = body.robotId;
        await firebase.updateOrder(customer, order);

        await new Promise((resolve) => setTimeout(resolve, 2_000));

        order.hashes.push('empty');
        await firebase.updateOrder(customer, order);

        // ! Need to forward everything in here
        if (order.url) {
            await sendSimulationRequest(
                `${order.url}/api/scenario${body.stage + 1}`,
                body.orderId,
                order.productId == 0 ? 'green' : order.productId == '1' ? 'purple' : 'blue'
            );

            return NextResponse.json({}, { status: 200 });
        }

        await new Promise((resolve) => setTimeout(resolve, 35_000));

        let hash;

        if (body.stage == 0) hash = await Contracts.pickOrder(body.orderId);
        else if (body.stage == 1) hash = await Contracts.packOrder(body.orderId);
        else hash = await Contracts.deliverOrder(body.orderId);

        order.hashes[body.stage * 2 + 3] = hash;
        if (body.stage == 2) order.status = 'completed';

        await firebase.updateOrder(customer, order);

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: `Error - ${error}` }, { status: 500 });
    }
}
