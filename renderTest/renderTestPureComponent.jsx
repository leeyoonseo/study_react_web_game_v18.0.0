import React, { PureComponent } from 'react';

// PureComponent
// state가 바뀌었는지를 보고 판단한다.
// - PureComponent는 shouldComponentUpdate의 얕은 비교가 자동으로 되어있는 버전.
// - 즉, 얕은 비교이기 때문에 참조관계의 {}, []가 있을 경우 판단이 어려워서 오작동 할 수 있다.
class renderTestPureComponent extends PureComponent {
  state = {
    array: [],
  };

  onClick = () => {
    // const arr = this.state.array; // 참조
    // arr.push(1); // 코드 적으로는 변화 발생
    // this.setState({
    //   array: arr, // 하지만 purecomponent는 리렌더링되지 않는다.
    // });

    // 따라서 컴포넌트 쓸때 원칙
    this.setState({
      // 이렇게 새로운 배열을 만들어서 넣어야 인식함
      array: [...this.state.array, 1], 
    })
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

export default renderTestPureComponent;