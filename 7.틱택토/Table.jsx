import React from 'react';
import Tr from './Tr';

const Table = ({ onClick, tableData }) => {
  return (
    <table onClick={onClick}>
      <tbody>
        {Array(tableData.length).fill().map((_, i) => (
           <Tr 
              rowData={tableData[i]} 
              key={`tr_${i}`} 
            />
        ))}
      </tbody>
    </table>
  );
};

export default Table;