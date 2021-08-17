import React from 'react';
import { Entry } from '../types';
import OccupationalHealthcareCard from './OccupationalHealthcareCard';
import HospitalCard from './HospitalCard';
import HealthCheckCard from './HealthCheckCard';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareCard entry={entry} />
      );
    case "Hospital": 
      return (
        <HospitalCard entry={entry} />
      );
    case "HealthCheck": 
      return (
        <HealthCheckCard entry={entry} />
      );
    default:
      return <p>ERROR</p>;
  }
};

export default EntryDetails;
