import React, { useContext } from 'react';
import { TableContext, CODE } from './MineSweeper'; 

const getTdStyle = code => {
  switch (code) {
    case CODE.NORMAL: 
    case CODE.MINE: 
      return {
        background: '#444',
      }
    case CODE.OPENED:
      return {
        background: '#fff',
      }
    default: 
      return {
        background: '#fff',
      }
  }
};

const getTdText = code => {
  switch (code) {
    case CODE.MINE:
      return 'X';
    case CODE.NORMAL: 
    case CODE.OPENED:
    default:
      return '';
  }
};

const Td = ({ rowIndex, cellIndex }) => {
  const { tableData } = useContext(TableContext);
  console.log(tableData[rowIndex][cellIndex]);

  return (
    <td
      style={getTdStyle(tableData[rowIndex][cellIndex])}
    >
      {getTdText(tableData[rowIndex][cellIndex])}
    </td>
  );
};

export default Td;