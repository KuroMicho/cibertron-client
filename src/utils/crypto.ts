import crypto from 'crypto';
import environment from '../config/environment';

interface Data {
    iv: string;
    encryptedData: string;
}

// Getting algorithm
const algorithm = environment.algorithm;

// Defining key
const password = environment.key;
const key = crypto.scryptSync(password || '123456', 'salt', 32);

// Defining iv
const iv = crypto.randomBytes(16);

export function encrypt(value: string | undefined) {
    if (!algorithm) return;
    if (!value) return;

    // Create a new cipher
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

    let result = cipher.update(value);
    result = Buffer.concat([result, cipher.final()]);

    return { iv: iv.toString('hex'), encryptedData: result.toString('hex') };
}

export function decrypt(data: Data) {
    if (!algorithm) return;

    let iv = Buffer.from(data.iv, 'hex');
    let encryptedText = Buffer.from(data.encryptedData, 'hex');

    // Creating Decipher
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

    // Updating encrypted text
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // returns data after decryption
    return decrypted.toString();
}
