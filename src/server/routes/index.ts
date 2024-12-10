import { Hono } from "hono";

const app = new Hono();

app.get("/ping", (c) => c.text("pong"));

export default app;
