import React from 'react';
import axios from "axios";
import { useParams } from 'react-router';
import { Icon, Button } from 'semantic-ui-react';
import { apiBaseUrl } from "../constants";

import { useStateValue, updatePatientState } from "../state";
import { Patient, Entry, EntryFormValues } from "../types";

import AddEntryModal from "../AddEntryModal";
import EntryDetails from '../components/EntryDetails';

const PatientPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [ patientUpdated, setPatientUpdated ] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const { id } = useParams<{ id: string }>();
  let currentPatient: Patient = patients[id];

  React.useEffect(() => {
    currentPatient = patients[id];
    updatePatient(id)
      .catch(e => console.log(e));
    setPatientUpdated(true);
  }, [patients]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const updatePatient = async (id: string) => {
    const { data: patientDataFromApi } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${id}`
    );
    dispatch(updatePatientState(patientDataFromApi));
  };

  const fixFieldTypes = (values: EntryFormValues) => {
    if (values.type === "Hospital") {
      return { ...values, discharge: { date: values.dischargeDate, criteria: values.dischargeCriteria } };
    }
    else if (values.type == "OccupationalHealthcare") {
      return { ...values, 
        sickLeave: values.sickLeaveStartDate 
          ? { startDate: values.sickLeaveStartDate, endDate: values.sickLeaveEndDate }
          : undefined
      };
    } else {
      return values;
    }
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    const obj = fixFieldTypes(values);
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        obj
      );
      const updatedPatient = {
        ...currentPatient,
        entries: [
          ...currentPatient.entries,
          newEntry
        ]
      };
      dispatch(updatePatientState(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  const patientGender = currentPatient.gender === 'female'
    ? <Icon name="woman" />
    : currentPatient.gender === 'male'
      ? <Icon name="man"/ >
      : <Icon name="genderless"/ >;

  if (!currentPatient || !patientUpdated || !diagnoses) {
    return (
      <p>Could not find patient with id {id}</p>
    );
  }


  return (
    <div>
      <h1>{currentPatient.name}</h1>
      <p>
        dob: {currentPatient.dateOfBirth} <br/>
        gender: {patientGender}<br/>
        <Icon name="hospital" />
        ssn: {currentPatient.ssn} <br/>
        occupation: {currentPatient.occupation}
      </p>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      <h2>entries</h2>
      {currentPatient.entries && currentPatient.entries.map((e, i) =>
        <EntryDetails key={i} entry={e} />
      )}
    </div>
  );
};

export default PatientPage;
