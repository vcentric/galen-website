import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "@/keystatic.config";

const { GET: keystaticGET, POST: keystaticPOST } = makeRouteHandler({ config });

// On Netlify the App Router handler sees the deploy's `*.netlify.app` host in
// `request.url`, so Keystatic builds the GitHub OAuth `redirect_uri` from that
// host instead of the public domain (login then fails / lands on netlify.app).
// Rebuild the request URL from `x-forwarded-host` — the real requested host —
// which is exactly what Keystatic's own pages-router handler already does.
function withForwardedHost(request: Request): Request {
  const forwardedHost = request.headers.get("x-forwarded-host");
  if (!forwardedHost) return request;
  const url = new URL(request.url);
  if (url.host === forwardedHost) return request;
  url.host = forwardedHost;
  url.protocol = request.headers.get("x-forwarded-proto") ?? url.protocol;
  return new Request(url.toString(), request);
}

export function GET(request: Request) {
  return keystaticGET(withForwardedHost(request));
}

export function POST(request: Request) {
  return keystaticPOST(withForwardedHost(request));
}
