import React, { Component, createRef } from 'react';
import Try from './Try';

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑아줌
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  state = {
    tries: [],
    value: '',
    answer: getNumbers(),
    result: '',
  };
  
  onChange = e => {
    this.setState({
      value: e.target.value
    })
  };

  onSubmitForm = e => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join('')) {
      this.setState((prevState) => {
        return {
          result: '홈런!',
          tries: [...prevState.tries, {
            try: prevState.value, 
            result: '홈런!',
          }]
        }
      })
    } else {
      const answerArray = this.state.value.split('').map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}였습니다!`,
        });
        alert('게임을 다시 시작합니다!');

        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        });

        // this.input.focus();
        this.input.current.focus(); // createRef를 사용하면 current를 추가해줘야한다.
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }

        this.setState(prevState => {
          return {
            tries: [...prevState.tries, {
              try: prevState.value,
              result: `${strike} 스트라이크, ${ball} 볼입니다.`,
            }],
            value: '',
          }
        });
        this.input.current.focus(); // createRef를 사용하면 current를 추가해줘야한다.

      } 
    }
  };

  // ref를 hooks와 비슷하게 만드는 방법은?, createRef를 쓰자
  // input;
  // onUInputRef = c => this.input = c;
  inputRef = createRef();

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChange} />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((v, i) => (
            // 부모 컴포넌트가 리렌더링되면 반드시 자식 컴포넌트도 리렌더링된다.
            // props, state가 바뀔때도 되지만.
            // 근데 try가 리렌더링될 이유가 필요 없는데, purecomponent를 통해 해결하자 (props, state 둘 다 가능)
            <Try key={`${i + 1}차 시도`} tryInfo={v} />
          ))}
        </ul>
      </>
    );
  }
}

// module.exports = NumberBaseball;
export default NumberBaseball;