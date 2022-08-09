import React, { useState } from 'react';
import Try from './TryHooks';

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑아줌
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseballHooks = () => {
  const [value, setValue] = useState('');
  // 문제!: 함수를 호출해서 return 값을 state로 받을 경우 
  // - 리 렌더링 시 마다 함수 호출하여 계산하지만-> 실제로는 첫번째 return 값만
  // - 초기 값으로 사용하므로 결과적으로는 쓸데없는 함수 호출이 계속 일어나게 되는셈!!
  // 해결방법!: useState가 함수 자체를 넘긴다.
  // - 최초 실행 시 return 값을 answer에 담고
  // - 이후에는 함수호출을 다시 하지 않는다.
  // 결과!: 따라서 함수자체를 넣어준다.
  const [answer, setAnswer] = useState(getNumbers); // lazy init 기법
  const [result, setResult] = useState('');
  const [tries, setTries] = useState([]);

  const onChange = e => {
    setValue(e.target.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (value === answer.join('')) {
      const resultValue = '홈런!';
      setResult(resultValue);
      setTries((prevTries) => {
        return [...prevTries, {
          try: value,
          result: resultValue
        }]
      });
    } else {
      const answerArray = value.split('').map(v => parseInt(v));
      let strike = 0;
      let ball = 0;

      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`);
        alert('게임을 다시 시작합니다!');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }

        setTries((prevTries) => {
          return [...prevTries, {
            try: value,
            result: `${strike} 스트라이크, ${ball} 볼입니다.`,
          }]
        });
      } 
    }

  };

  

  return (
    <>
        <h1>{result}</h1>
        <form onSubmit={onSubmitForm}>
          <input maxLength={4} value={value} onChange={onChange} />
        </form>
        <div>시도: {tries.length}</div>
        <ul>
        {tries.map((v, i) => (
            // 부모 컴포넌트가 리렌더링되면 반드시 자식 컴포넌트도 리렌더링된다.
            // props, state가 바뀔때도 되지만.
            // 근데 try가 리렌더링될 이유가 필요 없는데, memo를 통해 해결하자 (props, state 둘 다 가능)
            <Try key={`${i + 1}차 시도`} tryInfo={v} />
          ))}
        </ul>
      </>
  );
};

export default NumberBaseballHooks;