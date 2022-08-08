import React from 'react';
import ReactDOMClient from 'react-dom/client';
import NumberBaseball from './NumberBaseball';

// const React = require('react');
// const ReactDOMClient  = require('react-dom/client');
// const NumberBaseball = require('./NumberBaseball');

ReactDOMClient.createRoot(document.querySelector('#root')).render(<NumberBaseball />);
