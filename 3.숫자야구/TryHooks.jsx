import React, { memo } from 'react';

const TryHooks = memo(({tryInfo}) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

// 이때 memo를 쓰게 되면 reactDevTools에서 컴포넌트 이름이 이상하게 나온다.
// 이것을 해결하기 위해서 displayName을 지정해준다.
TryHooks.displayName = 'TryHooks';

export default TryHooks;