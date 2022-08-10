import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  // 계산량이 많다.
  // 반복 실행되면 안되기 때문에 외부의 function으로 뺐다.
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = [];
  
  componentDidMount() {
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          }
        })
      }, (i + 1) * 1000);
    }

    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  }

  
  componentWillMount() {
    this.timeouts.forEach(v => {
      clearTimeout(v);
    })
  }

  render() {
    const { winBalls, bonus, redo, onClickRedo } = this.state;

    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map(v => <Ball key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default Lotto;