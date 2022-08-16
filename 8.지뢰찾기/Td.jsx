import React, { useCallback, useContext, memo, useMemo } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSweeper'; 

const getTdStyle = code => {
  switch (code) {
    case CODE.NORMAL: 
    case CODE.MINE: 
      return {
        background: '#444',
      }
    case CODE.OPENED:
      return {
        background: '#fff',
      }
    case CODE.FLAG:
    case CODE.FLAG_MINE: 
      return {
        background: 'red',
      }
    case CODE.QUESTION:
    case CODE.QUESTION_MINE: 
      return {
        background: 'yellow',
      }
    default: 
      return {
        background: '#fff',
      }
  }
};

const getTdText = code => {
  // 처음 렌더링이 된 후에, useMemo로인해서 리렌더링은 클릭되는 td에 대한 부분만 리렌더링이 일어난다.
  // console.log('getTdText 렌더링');
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return '!';
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '?';
    case CODE.OPENED:
    default:
      return code || '';
  }
};

const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData, halted, dispatch } = useContext(TableContext);
  // console.log(tableData[rowIndex][cellIndex]);

  const onClickTd = useCallback(() => {
    if (halted) return;
    
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG:
      case CODE.FLAG_MINE:
      case CODE.QUESTION:
      case CODE.QUESTION_MINE: {
        return;
      }
      case CODE.NORMAL: {
        dispatch({
          type: OPEN_CELL,
          row: rowIndex,
          cell: cellIndex,
        });
        return;
      }
      case CODE.MINE: {
        dispatch({
          type: CLICK_MINE,
          row: rowIndex,
          cell: cellIndex,
        });
        return;
      } 
    }

  }, [tableData[rowIndex][cellIndex], halted]);

  const onRightClickTd = useCallback(e => {
    e.preventDefault();
    if (halted) return;

    switch (tableData[rowIndex][cellIndex]) {
      case CODE.NORMAL:
      case CODE.MINE: 
        dispatch({
          type: FLAG_CELL,
          row: rowIndex,
          cell: cellIndex
        });
        return;
      case CODE.FLAG:
      case CODE.FLAG_MINE:
        dispatch({
          type: QUESTION_CELL,
          row: rowIndex,
          cell: cellIndex
        });
        return;
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        dispatch({
          type: NORMALIZE_CELL,
          row: rowIndex,
          cell: cellIndex
        });
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);

  // 실제로는 useMemo가 되었기 때문에 리렌더링이 안되야한다.
  // 확인은 내부에서 선언한 함수에 콘솔을 넣어보도록. (getTdText 확인)
  // return useMemo(() => (
  //   <td
  //     style={getTdStyle(tableData[rowIndex][cellIndex])}
  //     onClick={onClickTd}
  //     onContextMenu={onRightClickTd}
  //   >
  //     {getTdText(tableData[rowIndex][cellIndex])}
  //   </td>
  // ), [tableData[rowIndex][cellIndex]]);

  // 위와 같이 작업하는것이 확인하기 어렵다면 아래의 RealTd 컴포넌트를 만들어서 사용하자
  return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />
});

const RealTd = memo(({ onClickTd, onRightClickTd, data }) => {
  // devtools에서는 반짝이나 실제 console.log 찍히는 것을 확인하면, 
  // 변경되는 회수에 맞춰서 렌더링되고 있다. === 즉, memo가 잘되고있다!
  // console.log('RealTd 렌더');
  return (
    <td
      style={getTdStyle(data)}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >
      {getTdText(data)}
    </td>
  )
});

export default Td;