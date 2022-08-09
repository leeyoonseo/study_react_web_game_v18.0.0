import React, { Component } from 'react';

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: [],
  };

  onClickScreen = () => {
    //
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.lengt === 1
      // jsx에서는 false, undefined, null로 태그없음을 나타낸다.
      ? null
      : (
        <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
      );
  };

  render() {
    const { state, message } = this.state;
    return (
      <>
        <div
          id="screen"
          className={state}
          onClick={this.onClickScreen}
        >
          {message}
        </div>
        
        {this.renderAverage}  
      </>
    );
  }
}

export default ResponseCheck;