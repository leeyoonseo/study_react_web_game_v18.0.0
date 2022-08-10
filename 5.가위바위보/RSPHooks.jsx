import React, { useEffect, useState, useRef, memo } from 'react';

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = imgCoord => {
  return Object.entries(rspCoords).find(v => v[1] === imgCoord)[0];
};

const RSPHooks = memo(() => {
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState('');
  const interval = useRef(null);

  // useEffect -> 회면 렌더링 되고 난 후에 실행.
  // useLayoutEffect ? => 잘 안쓰이지만, 화면 resize 할때 끝나고는 useEffect가 발생하는데,
  // useLayoutEffect는 하기 전에 발생해서 화면에 레이아웃들의 변화를 감지할때 사용한다.
  useEffect(() => { // componentDidMount, componentDidUpdate (1:1 대응은 아님)
    // 렌더링 될때마다 다시 실행.
    // Q. 그렇다면 setInterval이 아니라 useEffect가 계속 실행되서 changeHand가 실행되는것이 아니냐?
    // A. 맞다. 반복되며 꺼졌다 켜졌다한다.
    interval.current = setInterval(changeHand, 100);

    return () => { // componentWillUnmount 
      clearInterval(interval.current);
    }
  }, [imgCoord]); // 클로져 문제

  const changeHand = () => {   
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  }
  
  const onClickBtn = choice => () => {
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    clearInterval(interval.current);

    if (diff === 0) {
      setResult('비겼습니다.');

    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다.');
      setScore((prevScore) => prevScore + 1);

    } else {
      setResult('졌습니다.');
      setScore((prevScore) => prevScore - 1);
    }
    
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 2000);
  };

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn(rspCoords.바위)}>바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn(rspCoords.가위)}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn(rspCoords.보)}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
});

export default RSPHooks;