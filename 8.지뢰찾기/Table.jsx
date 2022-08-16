import React from 'react';
import Tr from './Tr';

const Table = ({ dispatch }) => {
  return (
    <table>
      <tbody>
        <Tr dispatch={dispatch} />
      </tbody>
    </table>
  );
};

export default Table;