function main(data) {
    const logs = data.streamData;

    const filteredLogs = [];
    logs.map((log) => {
        log.map((event) => {
            if (
                event.address &&
                event.address == '0xd1B9afB89969E15FcB2cBFBc43A282b52Ed05d13'.toLowerCase() &&
                event.topics[0] ==
                    '0x78bf7882883dd490a2cb49248c97a94f32ab88938714939772ff72e5d3eeb033'.toLowerCase()
            )
                filteredLogs.push(event);
        });
    });
    return filteredLogs;
}
