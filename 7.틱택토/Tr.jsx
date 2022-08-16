import React, { memo, useMemo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length).fill().map((_, i) => (
        useMemo(() => (
          <Td 
            key={`td_${i}`}
            rowIndex={rowIndex}
            cellIndex={i}
            cellData={rowData[i]}
            dispatch={dispatch}
          />
        )
        , [rowData[i]])
      ))}
    </tr>
  );
});

export default Tr;