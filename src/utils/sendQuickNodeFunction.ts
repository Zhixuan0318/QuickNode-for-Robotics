export async function sendSimulationRequest(
    link: string,
    orderId: string,
    boxColour?: 'blue' | 'green' | 'purple'
) {
    await fetch(
        'https://api.quicknode.com/functions/rest/v1/functions/62530b20-306f-4bd6-b015-25501571d615/call?result_only=true',
        {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': '',
            },
            body: JSON.stringify({
                network: 'base-sepolia',
                dataset: 'block',
                blockNumber: 19532341,
                user_data: {
                    link,
                    orderId,
                    color: boxColour ? boxColour : 'blue',
                },
            }),
        }
    );
}
