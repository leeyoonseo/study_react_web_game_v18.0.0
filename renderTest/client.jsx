import React from 'react';
import ReactDOMClient from 'react-dom/client';
import RenderTest from './renderTest';
// import RenderTestPureComponent from './renderTestPureComponent';

ReactDOMClient.createRoot(document.querySelector('#root')).render(<RenderTest />);
// ReactDOMClient.createRoot(document.querySelector('#root')).render(<RenderTestPureComponent />);
