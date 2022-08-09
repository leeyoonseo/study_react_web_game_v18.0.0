import React, { Component } from 'react';

// 클래스 라이프사이클
// constructor -> render -> ref -> componentDidMount
// -> (setState / props 바뀔때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
// 부모가 나를 없앴을때 -> componentWillUnmount -> 소멸

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

class RSP extends Component {
  state = {
    imgCoord: '0',
    score: 0,
    result: '',
  };

  interval;

  // 컴포넌트가 첫 렌더링 된 후
  componentDidMount() { // 비동기 요청 작업!
    // setState로 리렌더링이 일어나면 render가 다시 실행되도 componentDidMount는 실행되지 않는다.

    // 비동기 함수 바깥에 있는 함수를 참조하면 클로저가 발생함.
    // 때문에 바뀌지 않는 현상이 생겨서 비동기일 경우 내부로 코드를 옮겨서 해결하자.
    // const { imgCoord } = this.state;
    
    this.interval = setInterval(this.changeHand, 100);
  }

  componentDidUpdate() {
    // 리렌더링 후
  }

  componentWillUnmount() { // 비동기 요청 정리 작업!
    // 컴포넌트가 제거되기 직전, 부모에 의해 내가 없어질때.
    // componentDidMount에서 한 일들을 구독취소하거나 하는 등..
    clearInterval(this.interval);
  }

  changeHand = () => {   
    const { imgCoord } = this.state; // 클로져 문제 인지
    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  }

  onClickBtn = choice => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);

    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: '비겼습니다.',
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다!',
          score: prevState.score + 1,
        }
      });
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다!',
          score: prevState.score - 1,
        }
      });
    }
    
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 2000);
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
        <div>
          <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default RSP;