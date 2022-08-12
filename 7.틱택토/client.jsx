import React from 'react';
import ReactDOMClient from 'react-dom/client';
import Ticktacto from './Ticktacto';

ReactDOMClient.createRoot(document.querySelector('#root')).render(<Ticktacto />);

// useReducer ?
// - hooks가 생기면서 useState 등과 같은게 생겼다.
// A. 리액트에서 redux의 핵심 reducer를 추가했다.
// Q.react에서 redux와 비슷한 효과를 낼 수 있다.?
// Q. contextAPI와 같이 쓰면 redux를 대처 할 수 있냐?
// - 소규모에서는 조합으로 대체할 수 있지만, 클 경우에는 redux를 쓰게된다.
// - 비동기 처리가 불편하다고 함?