import {decode_jwt} from'./decode';

export function validate_jwt(secret: string, jwt: string):boolean{
    try{
        decode_jwt(secret, jwt);
        return true;
    }catch(e){
        return false;
    }
}