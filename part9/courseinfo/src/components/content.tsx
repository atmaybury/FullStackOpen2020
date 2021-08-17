import React from 'react';
import { CoursePart } from '../types'
import Part from './part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
  return (
    <div>
      {courseParts.map(c => 
        <Part key={c.name} coursePart={c} />
      )}
    </div>
  );
};

export default Content;
