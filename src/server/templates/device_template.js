
const getOptions = (devices) => {
    return devices.map(device => `<option value="${device.id}">${device.name} (${device.type})</option>`).join('')
}

const deviceTemplate = (payload) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>PartyQueue - Device Selection</title>
    </head>
    <body>
        <form method="POST">
            <select name="device">
                ${getOptions(payload.devices)}
            </select>
            <button type="submit">Select playing device</button>
        </form>
    </body>
    </html>
    `
}

export default deviceTemplate