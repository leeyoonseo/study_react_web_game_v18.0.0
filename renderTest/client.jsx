import React from 'react';
import ReactDOMClient from 'react-dom/client';
import RenderTest from './renderTest';

ReactDOMClient.createRoot(document.querySelector('#root')).render(<RenderTest />);
