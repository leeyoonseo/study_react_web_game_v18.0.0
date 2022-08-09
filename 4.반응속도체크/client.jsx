import React from 'react';
import ReactDOMClient from 'react-dom/client';
// import ResponseCheck from './ResponseCheck';
import ResponseCheckHooks from './ResponseCheckHooks';

ReactDOMClient.createRoot(document.querySelector('#root')).render(<ResponseCheckHooks />);
