import { headers } from "next/headers";
import {validate_jwt} from 'jwt-library';

export async function GET (req:Request){
    const headersList = headers();
  const referer = headersList.get("authorization");
    console.log(referer)
    try{
        const token = referer? referer.split(' ')[1] : "";
        console.log(token)
        console.log(process.env.JWT_SECRET_KEY)
        console.log(validate_jwt(process.env.JWT_SECRET_KEY || "", token))
    if(!token || !validate_jwt(process.env.JWT_SECRET_KEY || "", token)){
        return Response.json(
            {
                success: false,
                message: "Unauthorized"
            },
            {
                status: 401
            }
        )
    }
    return Response.json(
        {
            success: true,
            message: "Authorized"
        },
        {
            status: 200
        }
    )
    }catch(e){
        return Response.json(
            {
                success: false,
                message: "Error Validating Token"
            },
            {
                status: 500
            }
        )
    }
}