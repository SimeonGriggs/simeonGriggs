import { type Env } from "hono";

import { createMiddleware } from "hono/factory";
import { isIP } from "is-ip";

declare module "hono" {
  interface ContextVariableMap {
    clientIp?: string;
  }
}

declare module "react-router" {
  export interface AppLoadContext {
    readonly clientIp?: string;
  }
}

declare module "react-router" {
  interface LoaderFunctionArgs {
    context: AppLoadContext;
  }
}

export function clientIp<E extends Env = Env>() {
  return createMiddleware<E>(async (ctx, next) => {
    const ipAddress = headerNames
      .flatMap((headerName) => {
        const value = ctx.req.header(headerName);
        if (!value) return [];
        if (headerName === "Forwarded") return parseForwardedHeader(value);
        return value.includes(",")
          ? value.split(",").map((ip) => ip.trim())
          : [value];
      })
      .find((ip) => ip && isIP(ip));

    ctx.set("clientIp", ipAddress);

    await next();
  });
}

const headerNames = Object.freeze([
  "X-Client-IP",
  "X-Forwarded-For",
  "HTTP-X-Forwarded-For",
  "Fly-Client-IP",
  "CF-Connecting-IP",
  "Fastly-Client-Ip",
  "True-Client-Ip",
  "X-Real-IP",
  "X-Cluster-Client-IP",
  "X-Forwarded",
  "Forwarded-For",
  "Forwarded",
  "DO-Connecting-IP",
  "oxygen-buyer-ip",
] as const);

function parseForwardedHeader(value?: string) {
  return (
    value
      ?.split(";")
      .find((part) => part.trim().startsWith("for="))
      ?.slice(4) ?? undefined
  );
}
