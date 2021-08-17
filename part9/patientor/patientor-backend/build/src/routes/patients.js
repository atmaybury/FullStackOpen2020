"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = __importDefault(require("../utils"));
const patientsRouter = express_1.default.Router();
patientsRouter.get('/', (_req, res) => {
    res.json(patientsService_1.default.getAll());
});
patientsRouter.post('/', (req, res) => {
    try {
        const patient = utils_1.default(req.body);
        const addedPatient = patientsService_1.default.addPatient(patient);
        res.json(addedPatient);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});
exports.default = patientsRouter;
