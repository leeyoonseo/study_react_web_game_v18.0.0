import React from 'react';
import Td from './Td';

const Tr = ({ dispatch }) => {
  return (
    <tr>
      <Td dispatch={dispatch} />
    </tr>
  );
};

export default Tr;