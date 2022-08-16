import React from 'react';
import ReactDOMClient from 'react-dom/client';
import MineSweeper from './MineSweeper';

ReactDOMClient.createRoot(document.querySelector('#root')).render(<MineSweeper />);
