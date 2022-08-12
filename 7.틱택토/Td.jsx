import React, { useCallback } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './Ticktacto';

// dispatch를 넘겨 받는게 힘들기 때문에 contextAPI를 같이 사용한다.
const Td = ({ rowIndex, cellIndex, cellData, dispatch }) => {
  const onClickTd = useCallback(() => {
    // console.log('rowIndex', rowIndex);
    // console.log('cellIndex', cellIndex);
  
    dispatch({
      type: CLICK_CELL,
      row: rowIndex,
      cell: cellIndex,
    });

    dispatch({ type: CHANGE_TURN });
  }, []);

  return (
    <td  onClick={onClickTd}>{cellData}</td>
  );
};

export default Td;