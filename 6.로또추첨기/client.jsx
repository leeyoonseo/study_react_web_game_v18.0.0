import React from 'react';
import ReactDOMClient from 'react-dom/client';
import Lotto from './Lotto';
// import Lotto from './LottoHooks';

ReactDOMClient.createRoot(document.querySelector('#root')).render(<Lotto />);
