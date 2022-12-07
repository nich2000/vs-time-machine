const { ipcMain } = require('electron');
const { connector } = require('../Connector');
const Serialport = require('serialport');
const { sendToAllMessage } = require('./sendMessage');
const { connections } = require('../hardware/MXBaseServer');

ipcMain.on('list-serial-ports-request', async (e) => {
    const list = (await Serialport.list()).map((item) => item.path);
    sendToAllMessage('list-serial-ports-response', list);
});

ipcMain.on('connect-serial-port-request', async (e, path) => {
    if (path) {
        connector.connect('SERIAL_PORT', path);
    }
});

ipcMain.on('disconnect-serial-ports-request', async (e) => {
    if (connector && connector.isConnect) {
        connector.disconnect();
    }
    sendToAllMessage('status-serial-port', { isOpen: false });
});

ipcMain.on('connect-wlan-request', async (e, address, portSend, portListen) => {
    connector.connect('WLAN', address, portSend, portListen);
});

ipcMain.on('disconnect-wlan-request', async (e) => {
    if (connector && connector.isConnect) {
        connector.disconnect();
    }
    sendToAllMessage('status-wlan-port', { isOpen: false });
});

ipcMain.on('status-connect-request', async (e) => {
    if (connector && connector.connector && (connector.connector.port || connector.connector.socket)) {
        sendToAllMessage(
            'status-connect',
            { isOpen: !!connector.connector.socket },
            {
                isOpen: connector.connector.port ? connector.connector.port.isOpen : false,
                path: connector.connector.port ? connector.connector.port.path : undefined
            }
        );
    } else {
        sendToAllMessage('status-connect', { isOpen: false });
    }
});

ipcMain.on('MXAction', async (e, id, action) => {
    console.log(id, action)

    if(connections.length > 0) {
        console.log('send')

        let msg = "";
        switch (action) {
            case "List" : {
                msg = '{"cmd":"list","device":[1,2,3,4]}';
                break;
            }
            case "Config" : {
                msg = '{"cmd":"config","object":"device","value":[]}';
                break;
            }
            case "Sleep" : {
                msg = '{"cmd":"mode","object":"","value":"sleep"}';
                break;
            }
            case "Race" : {
                msg = '{"cmd":"mode","object":"","value":"race"}';
                break;
            }
            default : {
                console.log("unknown action")
                return;
            }
        }

        try {
            let conn = connections[0];
            conn.write(msg);
            // conn.pipe(conn);
        } catch (error) {
            console.log(error);
        }
    }
});
