import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { HealthCheckEntry } from '../types';

const HealthcheckCard = ({ entry }: { entry: HealthCheckEntry }) => {
  const [{ diagnoses },] = useStateValue();

  const healthIconColor: string = entry.healthCheckRating === 0
    ? 'green'
    : entry.healthCheckRating === 1
      ? 'gold'
      : entry.healthCheckRating === 2
        ? 'orange'
        : 'red';

  const healthIconStyle = { color: healthIconColor };

  return (
    <div>
      <h3>{entry.date} <Icon name="doctor"/></h3>
      {entry.description} <br/>
      <Icon style={healthIconStyle} name="heart" />
      <ul>
        {entry.diagnosisCodes && entry.diagnosisCodes.map((d, j) =>
          <li key={j}>{d} {diagnoses[d] && diagnoses[d].name}</li>
        )}
      </ul>
      <hr/>
    </div>
  );
};

export default HealthcheckCard;
