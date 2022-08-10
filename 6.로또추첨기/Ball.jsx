import React, { memo } from 'react';

// 제일 하위, 화면단만 그리는 컴포넌트는 PureComponent
// class Ball extends PureComponent {
//   render() {
//     const { number } = this.props;
//     let background;
//     if (number <= 10) {
//       background = 'red';
//     } else if (number <= 20) {
//       background = 'orange';
//     } else if (number <= 30) {
//       background = 'yellow';
//     } else if (number <= 40) {
//       background = 'blue';
//     } else {
//       background = 'green';
//     }

//     return (
//       <div className="ball" style={{ background }}>{number}</div>
//     );
//   }
// }

// state를 안쓸거면 일반 함수 컴포넌트로 만들어도됨.
// 이건 hooks가 아님, 함수 컴포넌트임 
// hooks은 함수 컴포넌트를 말하는 것이 아님 hooks은 useEffect, useState등을 사용한 함수형 컴포넌트를 칭함.
const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = 'red';
  } else if (number <= 20) {
    background = 'orange';
  } else if (number <= 30) {
    background = 'yellow';
  } else if (number <= 40) {
    background = 'blue';
  } else {
    background = 'green';
  }

  return (
    <div className="ball" style={{ background }}>{number}</div>
  );
});

Ball.displayName = 'Ball';

export default Ball;