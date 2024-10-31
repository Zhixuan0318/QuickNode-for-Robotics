import { NextRequest, NextResponse } from 'next/server';

import Contracts from '@/class/HyperAgileContracts';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body.orderId) throw new Error('No order was provided');
        if (body.robotId == undefined) throw new Error('No robot id was provided');

        await Contracts.generateRandomRobotId(body.orderId, body.robotId);

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: `Error - ${error}` }, { status: 500 });
    }
}
