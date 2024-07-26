import { headers } from "next/headers";
import { validate_jwt } from '@tanu-chahal/jwt-library';

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
    if (!validate_jwt(secret, token)) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Authorized",
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    return Response.json(
      {
        success: false,
        message: "Error Validating Token",
      },
      {
        status: 500,
      }
    );
  }
}