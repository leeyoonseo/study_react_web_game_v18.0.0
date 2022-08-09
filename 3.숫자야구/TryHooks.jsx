import React, { memo, useState } from 'react';

const TryHooks = memo(({ tryInfo }) => {
  // props는 자식이 변경하면 안된다.
  // 만약 props를 바꿔야한다면 state에 넣어준다. (좋은 구조는 아니다.)
  // 부모로부터 받은 props를 state로 넣을 수 있다.
  const [result, setResult] = useState(tryInfo.result);
  const onClick = () => {
    setResult('props를 바꾸기위해 state에 넣었다.');
  };

  return (
    <li>
      <div>{tryInfo.try}</div>
      <div onClick={onClick}>{result}</div>
    </li>
  );
});

// 이때 memo를 쓰게 되면 reactDevTools에서 컴포넌트 이름이 이상하게 나온다.
// 이것을 해결하기 위해서 displayName을 지정해준다.
TryHooks.displayName = 'TryHooks';

export default TryHooks;