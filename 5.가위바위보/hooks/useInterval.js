import { useRef, useEffect } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback; 
  })

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  return savedCallback.current;
}

export default useInterval;


// Q. 아래와 같이 작업할 수는 없는가? 꼭 function tick을 만들어서 작업해야하는가
// A. callback을 useEffect의 인자에 넣을 경우 callback이 변경되는 시점(changeHand)에 setInterval과 clearInterval이 다시 실행된다.
// 이때 delay가 1초라고 했을때, setInterval이 정확하게 1초 2초 3초로 동작했었는데, setInterval과 clearInterval을 재구독하게되면서
// 딜레이가 발생할 수 있다.
// 예를 들면....
// 1초 changeHand (setInterval, clearInterval 발생)
// 1.1초 가위
// 2.1초 changeHand (1.1초로부터 +1초)
// 2.2초 바위
// 3.2초 changeHand (2.1초로부터 +1초)
// callback이 바뀜에 따라서 잠깐의 시간만큼 딜레이가 발생할 수 있다.
// function useInterval(callback, delay) {
//   useEffect(() => {
//     if (delay !== null) {
//       let id = setInterval(callback, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay, callback]);

//   return callback;
// }