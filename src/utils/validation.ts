export function validateCredentials(ip: string | undefined, username: string | undefined) {
    const regExp = /^(?:\d{1,3}\.){3}\d{1,3}$/;
    if (!ip) throw new Error('Ip not found');
    if (!ip.match(regExp)) throw new Error('Invalid IP address');
    if (!username) throw new Error('Username not found');
}
