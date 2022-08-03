// const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval', // 개발 eval, 운영 hidden-source-map
  resolve: {
    extensions: ['.jsx', '.js'],
  },

  // 기억하기 좋은 플로우: etc... - entry - module - plugins - output 
  entry: {
    app: './client',
  },
  module: { // === loaders
    rules: [{
      test: /\.jsx?$/,
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
        plugins: [],
      }
    }],
  },
  plugins: [
    // new webpack.LoaderOptionsPlugin({ debug: true }), - 예시임 (loader에 options에 debug true를 다 넣어주는 플러그인임)
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
}