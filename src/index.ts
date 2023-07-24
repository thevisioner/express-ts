import express, { Express, Request, Response } from "express";
import compression from "compression";
import dotenv from "dotenv";
import helmet from "helmet";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// security headers
app.use(helmet());
app.disable("x-powered-by");

// performance optimization
app.use(compression());

// static files (css, js, images)
app.use("/static", express.static(path.join(__dirname, "public")));

// routes (api)
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// custom 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).send("404 Not Found");
});

// custom error handler
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send("Internal Serverless Error");
});

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
