"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDb = exports.query = void 0;
const pg_1 = require("pg");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const pool = new pg_1.Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
});
const query = (text, params) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield pool.query(text, params);
    return rows;
});
exports.query = query;
const initializeDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.query(`
    DROP TABLE IF EXISTS entities CASCADE;
    DROP TABLE IF EXISTS interactions CASCADE;
    CREATE TABLE IF NOT EXISTS entities (
      id VARCHAR PRIMARY KEY,
      name VARCHAR NOT NULL,
      company VARCHAR NOT NULL
    );
    CREATE TABLE IF NOT EXISTS interactions (
      id SERIAL PRIMARY KEY,
      source_id VARCHAR REFERENCES entities(id),
      target_id VARCHAR REFERENCES entities(id),
      type VARCHAR NOT NULL,
      timestamp VARCHAR NOT NULL,
      description VARCHAR NOT NULL
    );
  `);
    yield pool.query(`
    INSERT INTO entities (id, name, company) VALUES
    ('1', 'Alice Rogers', 'Acme Co'),
    ('2', 'Bob Arlo', 'Luna Inc'),
    ('3', 'Diana Evans', 'Cent Corp'),
    ('4', 'Chuck Davies', 'Alpha')
    ON CONFLICT DO NOTHING;
    INSERT INTO interactions (source_id, target_id, type, timestamp, description) VALUES
    ('1', '2', 'Phone', '01/12/2025 10:03AM', 'Called to ask about the status of the deal'),
    ('1', '3', 'Email', '01/12/2025 10:03AM', 'Sent status update on project milestones'),
    ('3', '1', 'Message', '01/12/2025 10:03AM', 'Discussed contract terms and timeline'),
    ('2', '4', 'Email', '01/12/2025 10:03AM', 'Sent updated proposal documents')
    ON CONFLICT DO NOTHING;
  `);
});
exports.initializeDb = initializeDb;
