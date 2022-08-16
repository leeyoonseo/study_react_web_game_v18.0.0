import React, { createContext, useMemo, useReducer } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
  OPENED: 0, // 0으로 의도한 코드
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  MINE: -7,
};

// contextAPI가 성능 최적화가 힘듬
export const TableContext = createContext({
  tableData: [
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
  ],
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  timer: 0,
  result: '',
};

export const START_GAME = 'START_GAME';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: {
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
      }
    }
    default:
      return state;
  }
};

const MineSweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { timer, result } = state;
  const value = useMemo(() => {
    tableData: state.tableData,
    dispatch // dispatch는 항상 같다
  }, [state.tableData]);


  return (
    // dispatch를 props로 전달하지 않고 contextAPI를 통해 전달한다. (Provider)
    // value를 이렇게 넣으면 mineSweeper가 리렌더링될때마다 객체가 새로생김 === contextAPI를 쓰는 자식들도 매번 리렌더링 된다는 말.
    // 때문에 value를 바로 넣는게 아니라 useMemo를 통해 캐싱해야한다.
    // <TableContext.Provider value={{ tableData: state.tableData, dispatch }}>
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table dispatch={dispatch} /> 
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSweeper;