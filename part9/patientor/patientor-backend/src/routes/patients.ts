import express from 'express';
import patientsService from '../services/patientsService';
import utils from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
	res.json(patientsService.getAll());
});

patientsRouter.get('/:id', (req, res) => {
	const id = req.params.id;
	const patient = patientsService.getById(id);
	return res.json(patient);
});

patientsRouter.post('/', (req, res) => {
	try {
		const patient = utils.toNewPatient(req.body);
		const addedPatient = patientsService.addPatient(patient);
		res.json(addedPatient);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

patientsRouter.post('/:id/entries', (req, res) => {
	const patientId = req.params.id;
	const addedEntry = patientsService.addEntry(patientId, req.body);
	res.json(addedEntry);
});

export default patientsRouter;
