import { encode_jwt, decode_jwt, validate_jwt} from '../index';

describe('JWT Library',()=>{
    const secret = "our-test-secret";
    const payload = {userName: "user0001", role: 'user'};
    const id = '0001'
    const token = encode_jwt(secret, id, payload, 300);

    it('should encode a JWT', ()=>{
        expect(typeof token).toBe('string');
        expect(token.split('.').length).toBe(3);
    });

    it('should decode a JWT', ()=>{
        const decoded = decode_jwt(secret, token);
        expect(decoded.id).toBe('0001');
        expect(decoded.payload).toHaveProperty('userName');
        expect(decoded.payload).toHaveProperty('role');
    });

    it('should validate a JWT', ()=>{
        expect(validate_jwt(secret, token)).toBe(true);
    });
});