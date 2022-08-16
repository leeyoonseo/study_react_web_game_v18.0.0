import React, { useCallback } from 'react';
import { CLICK_CELL } from './Ticktacto';

// dispatch를 넘겨 받는게 힘들기 때문에 contextAPI를 같이 사용한다.
const Td = ({ rowIndex, cellIndex, cellData, dispatch }) => {
  const onClickTd = useCallback(() => {
    // console.log('rowIndex', rowIndex);
    // console.log('cellIndex', cellIndex);

    if (cellData) {
      return;
    }
    
    // redux는 동기로 바뀐다.
    // react, useReducer는 state가 비동기임
    dispatch({
      type: CLICK_CELL,
      row: rowIndex,
      cell: cellIndex,
    });

  }, [cellData]);

  return (
    <td  onClick={onClickTd}>{cellData}</td>
  );
};

export default Td;