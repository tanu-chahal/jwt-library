import {NextApiRequest, NextApiResponse} from 'next';
import {validate_jwt} from 'jwt-library';

export default function handler(req: NextApiRequest, res: NextApiResponse){
    const token = req.headers.authorization?.split(' ')[1];
    if(!token || !validate_jwt(process.env.JWT_SECRET_KEY || "", token)){
        return res.status(401).send('Unauthorized');
    }
    res.status(200).json({message: 'Authorized'});
}