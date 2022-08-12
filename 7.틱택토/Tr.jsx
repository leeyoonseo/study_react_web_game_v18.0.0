import React from 'react';
import Td from './Td';

const Tr = ({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length).fill().map((_, i) => (
        <Td 
          key={`td_${i}`}
          rowIndex={rowIndex}
          cellIndex={i}
          cellData={rowData[i]}
          dispatch={dispatch}
        />
      ))}
    </tr>
  );
};

export default Tr;