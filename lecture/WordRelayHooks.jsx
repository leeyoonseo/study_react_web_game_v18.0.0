const React = require('react');
const { useState, useRef } = React;

const WordRelayHooks = () => {
  const [word, setWord] = useState('강남');
  const [result, setResult] = useState('');
  const refInput = useRef(null);

  const onSubmitForm = e => {
    e.preventDefault();
    const newWord = refInput.current.value;

    if (word[word.length - 1] === newWord[0]) {
      setWord(newWord);
      setResult('딩동댕');

      refInput.current.value = '';
      refInput.current.focus();
    } else {
      setResult('땡');

      refInput.current.value = '';
      refInput.current.focus();
    }
  };

  const onChangeInput = e => {
    setValue(newWord);
  };


  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        {/* 
          uncontrolled input: changed가 필요하지 않은 경우. (매우 간단할 때) submit 시 사용할 때만 가능 
          - value -> defaultValue
          - value 사용 시 controlled input으로 간주될 수 있다.
        */}
        <input ref={refInput} defaultValue="" />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelayHooks;