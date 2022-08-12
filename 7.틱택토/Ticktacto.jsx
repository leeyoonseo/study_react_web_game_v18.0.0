import React, { useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''], 
    ['', '', ''], 
    ['', '', ''],
  ],
};

export const CHANGE_TURN = 'CHANGE_TURN';
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';

const reducer = (state, action) => {
  switch(action.type) {
    case CHANGE_TURN: 
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      }
    case SET_WINNER:
      // 불변성
      // state.winner = action.winner (X)

      // (O)
      return {
        ...state,
        winner: action.winner,
      }
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      // 불변성은 immer라는 라이브러리로 가독성 문제를 해결한다.
      tableData[action.row] = [...tableData[action.row]]; 
      tableData[action.row][action.cell] = state.turn;

      return {
        ... state,
        tableData,
      }
    }
  }
};

const Ticktacto = () => {
  // reducer, 초기 값(state), 지연 초기화 (lazy initialize?) = 이건 복잡해 질때 사용한다는데?
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']])
  
  // component에 넣는 함수들은 다 useCallback
  const onClickTable = useCallback(() => {
    // dispacth안에 들어가는 건 action 객체.
    dispatch({
      type: SET_WINNER,
      winner: 'O',
    });
  }, []);

  return (
    <>
      {/* dispatch를 tictacto에서 가지고 있고 사용은 td에서 하기에 td까지 props를 전달해야한다... */}
      <Table tableData={state.tableData} dispatch={dispatch}/>
      {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  );
};

export default Ticktacto;