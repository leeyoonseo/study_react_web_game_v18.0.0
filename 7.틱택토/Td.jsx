import React, { memo, useCallback } from 'react';
import { CLICK_CELL } from './Ticktacto';

// dispatch를 넘겨 받는게 힘들기 때문에 contextAPI를 같이 사용한다.
const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {

  // 성능 최적화할 때 참고할 수 있는 방법
  // const ref = useRef([]);
  // useEffect(() => {
  //   // 1. ref에 저장한다.
  //   // 2. useEffect에서 변화를 감지한다.
  //   // 3. 콘솔에서 바뀌는 항목이 나올 경우 리 렌더링의 원인!
  //   console.log(
  //     rowIndex === ref.current[0],
  //     cellIndex === ref.current[1],
  //     dispatch === ref.current[2],
  //     cellData === ref.current[3]
  //   );
  //   console.log('cellData', cellData, ref.current[3])
  //   ref.current = [rowIndex, cellIndex, dispatch, cellData];
  // }, [rowIndex, cellIndex, dispatch, cellData]);

  const onClickTd = useCallback(() => {
    if (cellData) return;
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
});

export default Td;