"use strict";
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
exports.health = exports.deleteInteraction = exports.createInteraction = exports.getInteractions = exports.getEntities = void 0;
const postgresClient_1 = require("../../db/postgresClient");
const recordToInteraction = (apiResponse) => {
    return {
        id: apiResponse.id.toString(),
        timestamp: apiResponse.timestamp,
        sourceId: apiResponse.source_id,
        source: apiResponse.source_name,
        sourceCompany: apiResponse.source_company,
        targetId: apiResponse.target_id,
        target: apiResponse.target_name,
        targetCompany: apiResponse.target_company,
        type: apiResponse.type,
        description: apiResponse.description
    };
};
const getEntities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entities = yield (0, postgresClient_1.query)(`SELECT * from entities`);
    res.json(entities);
});
exports.getEntities = getEntities;
const getInteractions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const interactions = yield (0, postgresClient_1.query)(`
    SELECT i.id, i.type, i.description, i.timestamp, 
    source.id AS source_id, source.name AS source_name, source.company AS source_company, 
    target.id AS target_id, target.name AS target_name, target.company AS target_company 
    FROM interactions i 
    JOIN entities source ON i.source_id = source.id 
    JOIN entities target ON i.target_id = target.id
    ORDER BY i.id DESC;`);
    const convertedInteractions = interactions.map(recordToInteraction);
    res.json(convertedInteractions);
});
exports.getInteractions = getInteractions;
const createInteraction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const formattedTimestamp = now.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    }) + ' ' + now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    const interaction = req.body;
    const result = yield (0, postgresClient_1.query)(`
    INSERT INTO interactions (source_id, target_id, type, timestamp, description) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *, 
    (SELECT name FROM entities WHERE id = source_id) AS source_name,
    (SELECT company FROM entities WHERE id = source_id) AS source_company,
    (SELECT name FROM entities WHERE id = target_id) AS target_name,
    (SELECT company FROM entities WHERE id = target_id) AS target_company;`, [interaction.sourceId, interaction.targetId, interaction.type, formattedTimestamp, interaction.description]);
    const insertedInteraction = result[0];
    const convertedInteraction = recordToInteraction(insertedInteraction);
    res.status(201).json({ message: 'Interaction created', interaction: convertedInteraction });
});
exports.createInteraction = createInteraction;
const deleteInteraction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const interactionId = req.params.id;
    const result = yield (0, postgresClient_1.query)(`
    DELETE FROM interactions
    WHERE id = $1;`, [interactionId]);
    res.status(200).json({
        success: true,
        message: `Interaction ${interactionId} deleted successfully`
    });
});
exports.deleteInteraction = deleteInteraction;
const health = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send('OK');
});
exports.health = health;
