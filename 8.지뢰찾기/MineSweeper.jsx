import React, { createContext, useEffect, useMemo, useReducer } from 'react';
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
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  tableData: [
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
  ],
  dispatch: () => { },
  halted: false,
  openedCount: 0,
  timer: 0,
});

const initialState = {
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  tableData: [],
  timer: 0,
  result: '',
  halted: false,
  openedCount: 0,
  timer: 0,
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const shuffle = [];
  const candidate = Array(row * cell).fill().map((_, i) => {
    return i;
  });
  
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);

    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);

  return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: {
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        openedCount: 0,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
        timer: 0,
      }
    }
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData.forEach((_, i) => {
        tableData[i] = [...state.tableData[i]];
      });

      const checked = [];
      let openedCount = 0;

      const checkAround = (row, cell) => {
        if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
          return;
        } // 상하좌우 없는 칸 안 열기
        
        if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
          return;
        } // 닫힌 칸만 열기

        // 중복 검사, 한번 검사한 값은 다시 검사하지 않는다.
        if (checked.includes(row + '/' + cell)) {
          return;
        } else {
          checked.push(row + '/' + cell);
        }

        let around = [
          tableData[row][cell - 1], tableData[row][cell + 1],
        ];

        if (tableData[row - 1]) {
          around = around.concat(
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1],
          );
        }

        if (tableData[row + 1]) {
          around = around.concat(
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1],
          );
        }

        const count = around.filter(v => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;

        if (count === 0) {
          if (row > -1) {
            const near = [];
            if (row - 1 > -1) {
              near.push([row - 1, cell - 1]);
              near.push([row - 1, cell]);
              near.push([row - 1, cell + 1]);
            }

            near.push([row, cell - 1]);
            near.push([row, cell + 1]);

            if (row + 1 < tableData.length) {
              near.push([row + 1, cell - 1]);
              near.push([row + 1, cell]);
              near.push([row + 1, cell + 1]);
            }

            near.forEach(n => {
              if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                checkAround(n[0], n[1]);
              }
            });
          }
        }

        if (tableData[row][cell] === CODE.NORMAL) {
          // 칸이 닫힌 칸일 경우 카운트 증가 (중복 칸을 카운트 해버려서 생기는 버그 해결)
          openedCount += 1;
        }
        tableData[row][cell] = count;
      };

      checkAround(action.row, action.cell);

      let result = '';
      let halted = false;

      console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount, openedCount);
      // 승리
      if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다.`;
      }

      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
      }
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      }
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      }
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      }
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      }
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      }
    }
    default:
      return state;
  }
};

const MineSweeper = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted } = state;
  // dispatch는 변하지 않으므로 inputs에 안 넣어도된다.
  // contextAPI에서는 useMemo필수. 
  // contextAPI는 value가 바뀔때마다 리렌더링하므로!! 중요!!
  const value = useMemo(() => ({ tableData, halted, dispatch }), [state.tableData]);

  useEffect(() => {
    let timer;

    if (!halted) {
      timer = setInterval(() => { 
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    }
  }, [halted]);

  return (
    // dispatch를 props로 전달하지 않고 contextAPI를 통해 전달한다. (Provider)
    // value를 이렇게 넣으면 mineSweeper가 리렌더링될때마다 객체가 새로생김 === contextAPI를 쓰는 자식들도 매번 리렌더링 된다는 말.
    // 때문에 value를 바로 넣는게 아니라 useMemo를 통해 캐싱해야한다.
    // <TableContext.Provider value={{ tableData: state.tableData, dispatch }}>
    <TableContext.Provider value={value}>
      <Form />
      <div>{state.timer}</div>
      <Table /> 
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};

export default MineSweeper;