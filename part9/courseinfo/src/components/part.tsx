import React from 'react';
import { CoursePart } from '../types';

const Part = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {

  switch(coursePart.type) {
    case 'normal':
      return (
        <p>
          <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
          <i>{coursePart.description}</i>
        </p>
      );
    case 'groupProject':
      return (
        <p>
          <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
          <i>{coursePart.groupProjectCount}</i>
        </p>
      );
    case 'submission':
      return (
        <p>
          <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
          <i>{coursePart.description}</i><br/>
          submit to {coursePart.exerciseSubmissionLink}
        </p>
      );
    case 'requirements':
      return (
        <p>
          <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
          <i>{coursePart.description}</i><br/>
          required skills: {coursePart.requirements.map(c => `${c}, `)}
        </p>
      );
    default:
      return <p>DEFAULT</p>
  }
}

export default Part;
