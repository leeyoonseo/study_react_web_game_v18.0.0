import React from 'react';
import Tr from './Tr';

const Table = ({ tableData, dispatch }) => {
  return (
    <table>
      <tbody>
        {Array(tableData.length).fill().map((_, i) => (
           <Tr 
              rowData={tableData[i]} 
              rowIndex={i}
              key={`tr_${i}`} 
              dispatch={dispatch}
            />
        ))}
      </tbody>
    </table>
  );
};

export default Table;