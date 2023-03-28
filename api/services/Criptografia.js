import * as dotenv from 'dotenv'
dotenv.config()
import CryptoJS from 'crypto-js/core'
import CryptoAES from'crypto-js/aes';

export function cryptText(data) {
    return CryptoAES.encrypt(data, process.env.CRYPTO_PWD).toString();
}

export function decryptText(data) {
    var bytes = CryptoAES.decrypt(data, process.env.CRYPTO_PWD);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export function cryptObject(data) {
    return CryptoAES.encrypt(JSON.stringify(data), process.env.CRYPTO_PWD).toString();
}

export function decryptObject(data) {
    var bytes = CryptoAES.decrypt(data, process.env.CRYPTO_PWD);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}