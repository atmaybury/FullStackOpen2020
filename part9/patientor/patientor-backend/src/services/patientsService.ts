import patients from '../../data/patients';
import { Patient, PatientPublic, NewPatient, Entry, NewEntry } from '../types';
import utils from '../utils';
import { v1 as uuid } from 'uuid';

const getAll = (): PatientPublic[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const getById = (id: string): Patient => {
	const patient = patients.find(p => p.id === id);
	if (patient) {
		return {
			id: patient.id,
			name: patient.name,
			ssn: patient.ssn,
			dateOfBirth: patient.dateOfBirth,
			gender: patient.gender,
			occupation: patient.occupation,
			entries: patient.entries
		};
	} else throw new Error(`Could not find patient with id ${id}`);
};

const addPatient = (patient: NewPatient): Patient => {
	const id: string = uuid();
	const newPatient = { ...patient, id: id };
	patients.push(newPatient);
	return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
	const verifiedEntry = utils.toNewEntry({ ...entry, id: uuid() });
	patients.forEach(p => {
		if (p.id === id) {
			p.entries.push(verifiedEntry);
		}
	});
	console.log(patients.find(p => p.id === id));
	return verifiedEntry;
};

export default {
	getAll,
	getById,
	addPatient,
	addEntry
};
