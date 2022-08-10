import React, { useEffect, useState, useRef, memo } from 'react';
import useInterval from './hooks/useInterval';

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
  const [isRunning, setIsRunning] = useState(true);

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
    if (isRunning) {
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
  
      setIsRunning(false);      
  
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
        setIsRunning(true);      
      }, 2000);
    }
  };

  useInterval(changeHand, isRunning ? 100 : null);

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