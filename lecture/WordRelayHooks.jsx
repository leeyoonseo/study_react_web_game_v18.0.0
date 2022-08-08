const React = require('react');
const { useState, useRef } = React;

const WordRelayHooks = () => {
  const [word, setWord] = useState('강남');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const refInput = useRef(null);

  const onSubmitForm = e => {
    e.preventDefault();

    if (word[word.length - 1] === value[0]) {
      setWord(value);
      setResult('딩동댕');
      setValue('');
      refInput.current.focus();
    } else {
      setResult('땡');
      setValue('');
      refInput.current.focus();
    }
  };

  const onChangeInput = e => {
    setValue(e.target.value);
  };


  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={refInput}
          value={value}
          onChange={onChangeInput}
        />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelayHooks;