import * as crypto from "crypto";
import base64url from "base64url";

export function encode_jwt(
  secret: string,
  id: string | number,
  payload: object,
  ttl?: number
): string {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const extendedPayload = {
    ...payload,
    id,
    iat: currentTimestamp,
    ...(ttl ? { exp: currentTimestamp + ttl } : {}),
  };

  const encodedHeader = base64url.encode(JSON.stringify(header));
  const encodedPayload = base64url.encode(JSON.stringify(extendedPayload));

  const signature = crypto.createHmac("sha256", secret).update(`${encodedHeader}.${encodedPayload}`).digest("base64");

  const encodedSignature = base64url.fromBase64(signature);

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}