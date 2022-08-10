import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Ball from './Ball';

// useMemo 함수의 리턴 값을 기억
// useCallback 함수 자체를 기억

function getWinNumbers() {
  console.log('getWinNumbers')
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  
  return [...winNumbers, bonusNumber];
}

// useMemo와 useRef의 차이
//
// 값 저장 시에는 차이가 없어 보여도 값 변경 시에 차이가 있습니다.
// useMemo는 deps 배열에 있는 값이 바뀌는 게 있으면 자동으로 다시 계산해주는데
// useRef는 그런 게 없어서 매번 직접 다시 계산해주어야 합니다
const LottoHooks = () => {
  // useMemo를 통해 return 값을 기억시키자. === 복잡한 함수의 결과 값을 기억
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]); // === 일반 값을 기억

  useEffect(() => {
    runTimeouts();

    return () => {
      timeouts.current.forEach(v => {
        clearTimeout(v);
      });
    }
  }, [timeouts.current]);
  // timeout.current[i]에 넣는 건 감지하지 못하므로
  // timeouts.current를 마지막에 리셋하면서 비워주는 부분만 감지

  const runTimeouts = () => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevWinBalls) => {
          return [...prevWinBalls, winNumbers[i]]
        });
      }, (i + 1) * 1000);
    }

    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
  };

  const onClickRedo = useCallback(() => {
    // 무조건 useCallback 써도되나?
    // 문제가 있을 수 있다.
    // state가 기억되어서 무제가 생길 수 있으므로 inputs에 넣어야 새로운 값을 인식 할 수 있다.
    // 예시) 자식의 props로 함수를 넘기게 될때, 
    // useCallback으로 함수를 기억시키면 자식 컴포넌트는 함수가 업데이트 되기 전까지 같은 값으로 인식하고 리렌더링 하지 않는다.
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);

    timeouts = [];
  }, [winNumbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map(v => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball key={bonus} number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

export default LottoHooks;