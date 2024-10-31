const axios = require('axios');
const ethers = require('ethers');

async function main(params) {
    try {
        const logs = params.data;
        if (logs.length == 0) return;

        const contract = new ethers.Interface(['event UpdateStatus(string orderId, uint8 status)']);
        const decoded = contract.decodeEventLog('UpdateStatus', logs[0].data);

        if (decoded.status < 4) {
            const response = await axios.post(
                `https://auto-base.vercel.app/api/order/${
                    decoded.status == 0 ? 'process' : 'generateRobot'
                }`,
                JSON.stringify({
                    orderId: decoded.orderId,
                    robotId: Number(decoded.status) - 1,
                })
            );
            if (response.status == 500) throw new Error(response.error);
        }

        return {
            error: false,
            message: 'Success',
            orderId: decoded.orderId,
        };
    } catch (error) {
        return { error: true, message: error.message };
    }
}
