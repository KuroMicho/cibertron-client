import os from 'os';
import process from 'process';

import { Manager } from 'socket.io-client';
import { encrypt } from './utils/crypto';
import { formatUptime } from './utils/uptime';
import { validateCredentials } from './utils/validation';

const manager = new Manager('http://localhost:4000', {
    autoConnect: true,
    reconnectionAttempts: Infinity,
    forceBase64: true,
});
const socket = manager.socket('/');

let ipWlan: string | undefined = os.networkInterfaces()?.['Wi-Fi']?.[0].address;
let ipEth: string | undefined = os.networkInterfaces()?.['Ethernet']?.[0].address;
let username: string | undefined = process.env.USERNAME;
let timerInterval: NodeJS.Timer;

socket.on('connect', () => {
    try {
        let ip: string | undefined = ipEth ?? ipWlan;
        let time;
        validateCredentials(ip, username);
        socket.emit('info_user', { ip: encrypt(ip), username });
        // console.log(username + ' connected');
        timerInterval = setInterval(() => {
            time = formatUptime();
            // console.log(time);
            socket.emit('info_time', { ip: encrypt(ip), time });
        }, 1000); //emit every 1 second
    } catch (error) {
        console.error(error);
    }
});

socket.on('disconnect', () => {
    console.log(socket.active);
    clearInterval(timerInterval);
});
