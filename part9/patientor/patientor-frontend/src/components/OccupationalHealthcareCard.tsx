import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcareCard = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  const [{ diagnoses },] = useStateValue();

  return (
    <div>
      <h3>{entry.date} <Icon name="medrt"/></h3>
      {entry.employerName}<br/>
      {entry.description} 
      <br/><br/>
      {entry.sickLeave &&
        <p>
          <b>Sick leave</b><br/>
          start: {entry.sickLeave.startDate} <br/>
          end: {entry.sickLeave.startDate}
        </p>
      }
      <ul>
        {entry.diagnosisCodes && entry.diagnosisCodes.map((d, j) =>
        <li key={j}>{d} : {diagnoses[d] && diagnoses[d].name}</li>
        )}
      </ul>
      <hr/>
    </div>
  );
};

export default OccupationalHealthcareCard;
