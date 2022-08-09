import React, { Component } from 'react';

class renderTest extends Component {
  state = {
    counter: 0,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // 어떤 부분에서 렌더링을 다시해줘야할 지 작성해준다.
    if (this.state.counter !== nextState.counter) {
      return true;
    }

    return false;
  }

  onClick = () => {
    // props, state가 바뀌지 않아도 setState가 호출되면 render가 다시 일어난다.
    this.setState({});
  };

  render() {
    console.log('렌더링', this.state);

    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    )
  }
}

export default renderTest;