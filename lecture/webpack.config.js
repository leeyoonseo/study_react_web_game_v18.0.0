const path = require('path');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development', // 실서비스: production
  devtool: 'eval', 
  resolve: {
    extensions: ['.js', '.jsx'], // 자동으로 확장자를 찾아줌 
  },

  // 입력
  entry: {
    app: ['./client'],
  }, 
  module: {
    rules: [{
      // jsx 문법을 트랜스 파일링하기 위해 바벨 설정
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: [
          // plugin들의 모음이 preset (즉 수십개의 plugin들이 합쳐져 있다.)
          // 해당하는 preset에 대한 설정을 하고 싶을 경우 아래와 같이 작성 
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 5% in KR', 'last 2 chrome versions'], // 브라우저 호환 관련 옵션을 줄 수도 있다.
            },
            debug: true, // 개발 용에서 debug
          }],
          '@babel/preset-react'
        ], 
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    }]
  },

  // 출력
  output: {
    path: path.join(__dirname, 'dist'), // 현재 폴더 경로에서 dist
    filename: 'app.js',
  }, 
};

// babel
// babel/core: 코어 
// babel/preset-env: 크로스브라우징
// babel/preset-react: jsx문법
// babel-loader: webpack-babel 연결