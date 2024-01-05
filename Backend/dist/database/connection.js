"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const Connection = async () => {
    try {
        await mongoose_1.default.connect(`mongodb+srv://project_mao_amiga:${process.env.DATA_BASE_PASS}@datadreis.dnoi4fg.mongodb.net/?retryWrites=true&w=majority`);
        console.log("Connected to database");
    }
    catch (error) {
        console.log(`Error connecting to database: ${error}`);
        throw error;
    }
};
exports.default = Connection;
