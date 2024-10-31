import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import Firebase from '@/services/Database';

const usePollOrder = (customer: string | undefined, orderId: string, ngrokUrl: string | null) => {
    const router = useRouter();

    const firebase = useRef(new Firebase());

    const [order, setOrder] = useState<Order | undefined>();
    const [simulationStatus, setSimulationStatus] = useState<SimulatorStatus>('processing');

    const [poll, setPoll] = useState(false);
    useEffect(() => {
        if (!customer) return;
        firebase.current.getOrder(customer, orderId).then((order) => {
            if (!order) router.push('/home/store');
            if (ngrokUrl && !order.url) {
                order.url = ngrokUrl;
                firebase.current.updateOrder(customer, order);
            }
            setOrder(order);
            if (order.status != 'completed') setTimeout(() => setPoll(!poll), 2_000);
        });
    }, [customer, poll]);

    useEffect(() => {
        if (!order) return;
        const length = order.hashes.length;

        if (order.status == 'completed') setSimulationStatus('completed');
        else
            setSimulationStatus(
                length == 4
                    ? 'picking'
                    : length == 6
                    ? 'packing'
                    : length == 8
                    ? 'delivery'
                    : 'processing'
            );
    }, [order]);

    return { order, simulationStatus };
};

export default usePollOrder;
