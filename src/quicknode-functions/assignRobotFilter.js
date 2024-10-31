function main(data) {
    const logs = data.streamData;

    const filteredLogs = [];
    logs.map((log) => {
        log.map((event) => {
            if (
                event.address &&
                event.address == '0x939a06acF29be7EB588519216Da4457F9AF91636'.toLowerCase() &&
                event.topics[0] ==
                    '0x925abf81c28ff3984b742558ee05bd1cf5a3de6fc3191c94ed52fb1b08117471'.toLowerCase()
            )
                filteredLogs.push(event);
        });
    });
    return filteredLogs;
}
