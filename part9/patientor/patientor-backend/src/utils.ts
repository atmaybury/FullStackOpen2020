import { 
	NewPatient, 
	Gender, 
	Entry, 
	Diagnosis, 
	Discharge,
	HospitalEntry, 
	OccupationalHealthcareEntry, 
	HealthCheckEntry, 
	HealthCheckRating,
	SickLeave
} from './types';

/* GENERAL TYPE ASSERTIONS */
const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isArray = (field: unknown): field is Array<unknown> => {
	return Array.isArray(field);
};

/* GENERAL FIELD TYPES */
const ensureString = (field: unknown): string => {
	if (!field || !isString(field)) {
		throw new Error('field is not string');
	}
	return field;
};
const ensureDate = (field: unknown): string => {
	if (!field || !isString(field) || !isDate(field)) {
		throw new Error('invalid or missing date');
	}
	return field;
};

/* PATIENT VERIFICATION */

type PatientFields = Omit<NewPatient, 'entries'>;

const ensureGender = (field: unknown): Gender => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const isGender = (gender: any): gender is Gender => {
		return Object.values(Gender).includes(gender);
	};
	if (!field || !isGender(field)) {
		throw new Error('invalid or missing gender');
	}
	return field;
};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): NewPatient => {
	const newPatient: NewPatient = {
		name: ensureString(name),
		dateOfBirth: ensureDate(dateOfBirth),
		ssn: ensureString(ssn),
		gender: ensureGender(gender),
		occupation: ensureString(occupation),
		entries: []
	};
	return newPatient;
};

/* ENTRY VERIFICATION */

type NewEntryBase = {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
};

const ensureDiagnosisCodes = (field: unknown): Array<Diagnosis['code']> => {
	const isArrayofDiagnosisCodes = (array: Array<unknown>): array is Array<Diagnosis['code']> => {
		array.forEach(c => {
			if (!isString(c)) {
				throw new Error('Diagnoses codes must be strings');
			}
		});
		return true;
	};
	if (!isArray(field) || !isArrayofDiagnosisCodes(field)) {
		throw new Error('diagnosis codes must be an array of strings');
	}
	return field;
};

const ensureDischarge = ({ date, criteria }: { date: unknown, criteria: unknown }): Discharge => {
	return {
		date: ensureDate(date),
		criteria: ensureString(criteria)
	};
};
const ensureHealthCheckRating = (field: unknown): HealthCheckRating => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const isHealthCheckRating = (healthCheckRating: any): healthCheckRating is HealthCheckRating => {
		return Object.values(HealthCheckRating).includes(healthCheckRating);
	};
	if (field === undefined || !isHealthCheckRating(field)) {
		throw new Error('invalid health check rating');
	}
	return field;
};
const ensureSickLeave = ({ startDate, endDate }: { startDate: unknown, endDate: unknown }): SickLeave => {
	return {
		startDate: ensureDate(startDate),
		endDate: ensureDate(endDate)
	};
};

const verifyBaseEntry = ({ id, description, date, specialist, diagnosisCodes }: NewEntryBase): NewEntryBase => {
	const entryBase: NewEntryBase = {
		id: ensureString(id),
		description: ensureString(description),
		date: ensureDate(date),
		specialist: ensureString(specialist),
		diagnosisCodes: diagnosisCodes
			? ensureDiagnosisCodes(diagnosisCodes)
			: []
	};
	return entryBase;
};

const toNewHospitalEntry = (entry: HospitalEntry): HospitalEntry=> {
	const baseEntry = verifyBaseEntry(entry);
	const hospitalEntry = {
		...baseEntry,
		discharge: ensureDischarge(entry.discharge),
		type: entry.type
	};
	return hospitalEntry;
};

const toNewOccupationalHealthcareEntry = (entry: OccupationalHealthcareEntry): OccupationalHealthcareEntry=> {
	const baseEntry = verifyBaseEntry(entry);
	const occupationalHealthcareEntry = {
		...baseEntry,
		employerName: ensureString(entry.employerName),
		sickLeave: entry.sickLeave
			? ensureSickLeave(entry.sickLeave)
			: undefined,
		type: entry.type
	};
	return occupationalHealthcareEntry;
};

const toNewHealthcheckEntry = (entry: HealthCheckEntry): HealthCheckEntry=> {
	const baseEntry = verifyBaseEntry(entry);
	const healthCheckEntry = {
		...baseEntry,
		healthCheckRating: ensureHealthCheckRating(entry.healthCheckRating),
		type: entry.type
	};
	return healthCheckEntry;
};

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const toNewEntry = (entry: any): Entry => {
// // TODO move verifyBaseEntry here?
	switch (entry.type) {
		case "Hospital":
			return toNewHospitalEntry(entry);
		case "OccupationalHealthcare":
			return toNewOccupationalHealthcareEntry(entry);
		case "HealthCheck":
			return toNewHealthcheckEntry(entry);
		default:
			throw new Error('invalid entry type');
	}
};

export default {
	toNewPatient,
	toNewEntry
};
