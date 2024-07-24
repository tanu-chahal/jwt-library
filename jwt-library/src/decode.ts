import * as crypto from 'crypto';
import base64url from 'base64url';

export function decode_jwt(secret: string, jwt: string): {id: string, payload:object, expires_at: Date | null}{
    const [header,payload,signature] = jwt.split('.');

    const expectedSignature = base64url.fromBase64(crypto.createHmac('sha256',secret).update(`${header}.${payload}`).digest('base64'));
    if(signature !== expectedSignature){
        throw new Error('Invalid JWT signature!');
    }

    // const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
    const decodedPayload = JSON.parse(base64url.decode(payload));
    if(decodedPayload.exp && Math.floor(Date.now()/1000)>= decodedPayload.exp){
        throw new Error('JWT expired!')
    }
    const expiresAt = decodedPayload.exp ? new Date(decodedPayload.exp * 1000) : null;
    return {
        id: decodedPayload.id,
        payload: decodedPayload,
        expires_at: expiresAt
    };
}