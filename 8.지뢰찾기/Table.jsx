import React, { useContext, memo } from 'react';
import { TableContext } from './MineSweeper'; 
import Tr from './Tr';

const Table = memo(() => {
  const { tableData } = useContext(TableContext);

  return (
    <table>
      <tbody>
        {Array(tableData.length).fill().map((_, i) => (
          <Tr
            key={`tr${i}`}
            rowIndex={i}
          />
        ))}
      </tbody>
    </table>
  );
});

export default Table;