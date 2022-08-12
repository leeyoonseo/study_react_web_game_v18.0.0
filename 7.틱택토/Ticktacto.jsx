import React, { useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [['', '', ''], ['', '', ''], ['', '', '']]
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'SET_WINNER':
      // 불변성
      // state.winner = action.winner (X)

      // (O)
      return {
        ...state,
        winner: action.winner,
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
      type: 'SET_WINNER',
      winner: 'O',
    });
  }, []);

  return (
    <>
      <Table 
        onClick={onClickTable} 
        tableData={state.tableData} 
      />
      {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  );
};

export default Ticktacto;