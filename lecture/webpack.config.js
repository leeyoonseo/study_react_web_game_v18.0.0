const path = require('path');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development', // 실서비스: production
  devtool: 'eval', 
  resolve: {
    extensions: ['.js', '.jsx'], // 자동으로 확장자를 찾아줌 
  },
  entry: {
    app: ['./client'],
  }, // 입력
  output: {
    path: path.join(__dirname, 'dist'), // 현재 폴더 경로에서 dist
    filename: 'app.js',
  }, // 출력
};