import { colors, flags, oak } from "deps";
import router from "@/routes/index.ts";
import logger from "@/middlewares/logger.ts";
import timing from "@/middlewares/timing.ts";

const app = new oak.Application();

// Logger (Middleware)
app.use(logger);

// Timing (Middleware)
app.use(timing);

// Router
app.use(router.routes());

app.addEventListener("listen", ({ hostname, port }) => {
  console.log(
    colors.bold("Start listening on ") + colors.yellow(`${hostname}:${port}`),
  );
});

const { args } = Deno;
const DEFAULT_PORT = 8000;
const argPort = flags.parse(args).port;

await app.listen({ port: argPort ? Number(argPort) : DEFAULT_PORT });
