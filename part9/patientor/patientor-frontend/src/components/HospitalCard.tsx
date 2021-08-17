import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { HospitalEntry } from '../types';

const HospitalCard = ({ entry }: { entry: HospitalEntry }) => {
  const [{ diagnoses },] = useStateValue();

  return (
    <div>
      <h3>{entry.date} <Icon name="hospital"/></h3>
      {entry.description} <br/>
      {entry.discharge &&
        <div>
          <b>Discharged</b><br/>
          date: {entry.discharge.date} <br/>
          criteria: {entry.discharge.criteria}
        </div>
      } 
      <ul>
        {entry.diagnosisCodes && entry.diagnosisCodes.map((d, j) =>
          <li key={j}>{d} {diagnoses[d] && diagnoses[d].name}</li>
        )}
      </ul>
      <hr/>
    </div>
  );
};

export default HospitalCard;
