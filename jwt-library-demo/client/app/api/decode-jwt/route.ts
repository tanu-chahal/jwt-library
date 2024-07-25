import { decode_jwt } from '@tanu-chahal/jwt-library';
import { headers } from "next/headers";

export async function POST (req: Request) {
  const headersList = headers();
  const referer = headersList.get("authorization");
  const token = referer ? referer.split(" ")[1] : "";
  const { secret } = await req.json();
  try {
    if (!token || !secret) {
      return Response.json(
        {
          success: false,
          message: "Missing token or secret",
        },
        {
          status: 400,
        }
      );
    }
    const decoded = decode_jwt(secret, token);
    return Response.json(
      {
        success: true,
        message: "Authorized",
        data: decoded
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log(e.message)
    return Response.json(
      {
        success: false,
        message: e.message || "Invalid secret or token",
      },
      {
        status: 401,
      }
    );
  }
}