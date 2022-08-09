import React, { PureComponent } from 'react';

class Try extends PureComponent {
  // constructor가 쓰이는 경우??
  constructor(props) {
    super(props);
    // 내부에서 props를 정밀하게 컨트롤해서 state에 담고 싶을때도 사용한다.
    // const filtered = this.props.filter(() => {
      //... 
    // });
    
    // shouldComponentUpdate(nextProps, nextState) {
    // Q. nextState? 
    // A. contextAPI에 나온다.
    // 
    // }

    // class에서 props를 state로 바꾸고 싶다?
    this.state = {
      result: this.props.result,
      try: this.props.try,
    };
  }


  render() {
    return (
      <li>
        <div>{state.try}</div>
        <div>{state.result}</div>
      </li>
    );
  }
}

export default Try;