const os = require('os');

// 获取本机ip地址
const getLocalHostnameAndIp = () => {
    let IPv4;
    let interfaces = os.networkInterfaces();
    if (process.platform === 'darwin') {
        for (let i = 0; i < interfaces.en0.length; i++) {
            if (interfaces.en0[i].family == 'IPv4') {
                IPv4 = interfaces.en0[i].address;
            }
        }
    } else if (process.platform === 'win32') {
        for (let devName in interfaces) {
            let iface = interfaces[devName];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (
                    alias.family === 'IPv4' &&
                    alias.address !== '127.0.0.1' &&
                    !alias.internal
                ) {
                    IPv4 = alias.address;
                }
            }
        }
    }

    return IPv4;
};

module.exports = getLocalHostnameAndIp;
