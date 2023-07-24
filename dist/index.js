"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// security headers
app.use((0, helmet_1.default)());
app.disable("x-powered-by");
// performance optimization
app.use((0, compression_1.default)());
// static files (css, js, images)
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "public")));
// routes (api)
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
// custom 404 handler
app.use((req, res) => {
    res.status(404).send("404 Not Found");
});
// custom error handler
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send("Internal Serverless Error");
});
app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);
});
