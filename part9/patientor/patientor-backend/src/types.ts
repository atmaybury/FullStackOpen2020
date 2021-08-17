export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}
export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other"
}

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
	entries: Entry[];
}
export type PatientPublic = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;

interface EntryBase {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
	Healthy = 0,
	LowRisk = 1,
	HighRisk = 2,
	CriticalRisk = 3
}
export interface SickLeave {
	startDate: string;
	endDate: string;
}
export interface Discharge {
	date: string;
	criteria: string;
}

export interface OccupationalHealthcareEntry extends EntryBase {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: SickLeave;
} 
export interface HospitalEntry extends EntryBase {
	type: "Hospital";
	discharge: Discharge;
}
export interface HealthCheckEntry extends EntryBase {
	type: "HealthCheck"
	healthCheckRating: HealthCheckRating;
}
export type Entry =
	| HealthCheckEntry
	| OccupationalHealthcareEntry
	| HospitalEntry;

type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'type' | 'id'>;
type NewHospitalEntry = Omit<HospitalEntry, 'type' | 'id'>;
type NewHealthCheckEntry = Omit<HealthCheckEntry, 'type' | 'id'>;
export type NewEntry =
	| NewOccupationalHealthcareEntry
	| NewHospitalEntry
	| NewHealthCheckEntry;
