import React, { Component } from 'react';

// 클래스 라이프사이클
// constructor -> render -> ref -> componentDidMount 
// -> (setState / props 바뀔때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
// 부모가 나를 없앴을때 -> componentWillUnmount -> 소멸

class RSP extends Component {
  state = {
    imgCoord: 0,
    score: 0,
    result: '',
  };

  // 컴포넌트가 첫 렌더링 된 후
  componentDidMount() {
    // setState로 리렌더링이 일어나면 render가 다시 실행되도 componentDidMount는 실행되지 않는다.
  }

  componentDidUpdate() {
    // 리렌더링 후
  }

  componentWillUnmount() {
    // 컴포넌트가 제거되기 직전, 부모에 의해 내가 없어질때.
    // componentDidMount에서 한 일들을 구독취소하거나 하는 등..
  }

  onClickBtn = () => {

  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
        <div>
          <button id="rock" className="btn" onClick={() => onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={() => onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={() => onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default RSP;