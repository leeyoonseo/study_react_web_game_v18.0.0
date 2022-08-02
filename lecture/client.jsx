const React = require('react');
const ReactDom = require('react-dom');
const WordRelay = require('./WordRelay');

ReactDom.createRoot(document.querySelector('#root')).render(<WordRelay />);

// JS와 JSX 확장자의 차이?
// JSX는 React 전용파일
// JSX 문법 쓰면 붙여준다고 함. (규칙같이 본인이 정하는?)
