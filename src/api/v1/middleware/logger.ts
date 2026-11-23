import morgan, { StreamOptions } from "morgan";
import fs from "fs";
import path from "path";

// Ensure logs directory exists
const logsDir = path.join(__dirname, "../../../logs");

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, {
        recursive: true,
    });
}

// Access log file
const accessLogStream = fs.createWriteStream(
    path.join(logsDir, "access.log"),
    {
        flags: "a",
    },
);

// Error log file
const errorLogStream: StreamOptions = {
    write: (message) => {
        fs.appendFileSync(
            path.join(logsDir, "error.log"),
            message,
        );
    },
};

// Production access logger
const accessLogger = morgan(
    "combined",
    {
        stream: accessLogStream,
    },
);

// Production error logger
const errorLogger = morgan(
    "combined",
    {
        stream: errorLogStream,
        skip: (_req, res) => res.statusCode < 400,
    },
);

// Development console logger
const consoleLogger = morgan("dev");

export {
    accessLogger,
    errorLogger,
    consoleLogger,
};