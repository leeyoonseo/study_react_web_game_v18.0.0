import React, { useRef, useState, memo } from 'react';

const ResponseCheckHooks = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState([]);
  // this의 속성들을 ref 사용
  // useState는 바뀌면 render가 다시 실행된다.
  // useRef를 사용할때는 render가 다시 실행되지 않는다.
  // === 바뀌어도 render에 영향주고 싶지 않을 때 사용할 수 있다.
  const timeout = useRef(null); 
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
      
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000 + 2000)); // 2-3초 랜덤
    } else if (state === 'ready') {
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
    } else if (state === 'now') {
      endTime.current = new Date();
      setState('waiting');
      setResult((prevResult) => [...prevResult, endTime.current - startTime.current]);
      setMessage('클릭해서 시작하세요.');
    }
  };

  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
    )
  }

  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={onClickScreen}
      >
        {message}
      </div>
      {renderAverage()}  
    </>
  );
};

export default ResponseCheckHooks;