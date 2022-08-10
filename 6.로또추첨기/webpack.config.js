const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

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
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'react-refresh/babel', // 바벨이 최신 문법 -> 옛날 자바스크립트로 트랜스 파일링 할때 핫리로딩 기능을 추가로 해줌
        ],
      },
    }]
  },

  plugins: [
    new ReactRefreshWebpackPlugin()
  ],

  // 출력
  output: {
    path: path.join(__dirname, 'dist'), // 현재 폴더 경로에서 dist
    filename: 'app.js',
    publicPath: '/dist/',
  }, 

  // 변경점을 감지하여 저장한 결과물을 수정해준다. 
  devServer: {
    devMiddleware: { publicPath: '/dist' }, // output의 publicPath
    static: { directory: path.resolve(__dirname) }, // 정적 파일의 경로(index.html)
    // static: { directory: path.resolve(__dirname, 'src') }, // - src 폴더 하위에 있을 경우 예시
    hot: true,
  },
};

// babel
// babel/core: 코어 
// babel/preset-env: 크로스브라우징
// babel/preset-react: jsx문법
// babel-loader: webpack-babel 연결