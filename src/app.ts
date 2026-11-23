import express, { Express, Request, Response } from "express";
import loanRoutes from "./api/v1/routes/loanRoutes";

const app: Express = express();

app.use(express.json());

app.get("/api/v1/health", (_req: Request, res: Response) => {
    res.status(200).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

app.use("/api/v1/loans", loanRoutes);

export default app;