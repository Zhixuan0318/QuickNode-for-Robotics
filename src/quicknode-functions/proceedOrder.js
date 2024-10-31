const axios = require('axios');
const ethers = require('ethers');

async function main(params) {
    try {
        const logs = params.data;
        if (logs.length == 0) return;

        const contract = new ethers.Interface([
            'event AssingRobot(string orderId, uint8 activity, uint256 robotId)',
        ]);

        const data = contract.decodeEventLog('AssingRobot', logs[0].data);
        if (data.activity != undefined) {
            const response = await axios.post(
                'https://auto-base.vercel.app/api/order/proceed',
                JSON.stringify({
                    orderId: data.orderId,
                    stage: Number(data.activity),
                    robotId: Number(data.robotId),
                    hash: logs[0].transactionHash,
                })
            );
            if (response.status == 500) throw new Error(response.error);
        }

        return {
            error: false,
            message: 'Success',
        };
    } catch (error) {
        return { error: true, message: error.message };
    }
}
