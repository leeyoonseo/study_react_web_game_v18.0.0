const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onChange = e => {
    setValue(e.target.value);
    setResult('');
  };

  const onSubmit = e => {
    e.preventDefault();

    const answer = parseInt(value);
    const correct = first * second;

    if (answer === correct) { 
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setResult('정답: ' + value);
      setValue('');
      inputRef.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div>{first} X {second} 는?</div>
      <form onSubmit={onSubmit}>
        <input 
          ref={inputRef}
          type="number" 
          placeholder="정답을 입력하세요..."  
          value={value} 
          onChange={onChange}
        />
        <button type="submit">입력</button>
      </form>
      <div>{result}</div>
    </>
  )
};

module.exports = GuGuDan;