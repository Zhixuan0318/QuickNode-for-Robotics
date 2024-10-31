const axios = require('axios');

async function main(params) {
    const data = params.user_data;
    try {
        await axios.post(
            data.link,
            {
                orderId: data.orderId,
                boxColour: data.color,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        return {
            error: false,
            message: 'Success',
        };
    } catch (error) {
        return {
            error: true,
            message: error.message,
        };
    }
}
