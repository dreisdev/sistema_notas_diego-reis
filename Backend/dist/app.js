"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const connection_1 = __importDefault(require("./database/connection"));
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const allowedOrigins = [
    "http://localhost:5173",
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(async (req, res, next) => {
    try {
        await (0, connection_1.default)();
        next();
    }
    catch (error) {
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(PORT, () => {
    console.log(`Server  on port ${PORT}`);
});
