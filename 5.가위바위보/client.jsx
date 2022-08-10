import React from 'react';
import ReactDOMClient from 'react-dom/client';
// import RSP from './RSP';
import RSP from './RSPHooks';

ReactDOMClient.createRoot(document.querySelector('#root')).render(<RSP />);
