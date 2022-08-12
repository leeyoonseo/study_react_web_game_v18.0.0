import React from 'react';
import Td from './Td';

const Tr = ({ rowData }) => {
  return (
    <tr>
      {Array(rowData.length).fill().map((_, i) => (
        <Td key={`td_${i}`}/>
      ))}
    </tr>
  );
};

export default Tr;