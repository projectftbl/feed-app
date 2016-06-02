import React from 'react';
import { Heading } from '@ftbl/component';
import { Spinner } from '@ftbl/icons';

export default ({ member }) => {
  if (member == null) return <Spinner rotate={true} />;
  
  return (
    <div>
      <Heading>{member.name}</Heading>
    </div>
  );
};
