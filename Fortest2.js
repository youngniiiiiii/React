import React, { useState } from "react";
function Fortest2(props) {
  const [fruitList, setFluitList] = useState([
    "사과",
    "배",
    "포도",
    "수박",
    "딸기",
  ]);
  const [fruit, setFluit] = useState("");
  //input태그에 값 입력하면 fruit변수에 값을 저장한다.
  const onChange = (e) => {
    setFluit(e.target.value);
  };
  //추가버튼을 누르면 fruit변수의 값을 fruitList에 추가한다.
  const goAppend = (e) => {
    //배열의 push함수를 사용하지못함
    //원래배열에 데이터를 추가하기 위해서는 배열자체를 새로 만들어 바꿔치기를 해야함
    // push = 원래 배열메모리에 추가
    // concat = 새로운 배열을 만들어서 기존배열 내용복사한 후 하나만 추가
    setFluitList(fruitList.concat(fruit));
    setFluit("");
  };
  function goSelect(index) {
    alert(fruitList[index]);
  }
  return (
    // <div>
    //   <ul>
    //     {fruitList.map((e) => {
    //       return <li>{e}</li>;
    //     })}
    //   </ul>
    // </div>
    // 위 아래 동일한 의미
    <div>
      <input type="text" onChange={onChange} value={fruit} />
      <button type="button" onClick={goAppend}>
        추가하기
      </button>
      <ul>
        {fruitList.map((item, index) => {
          return (
            <li key={index}>
              <a
                href="#none"
                onClick={() => {
                  goSelect(index); // index와 같은 파라미터값 전달을 위해서는 람다식 사용
                }}
              >
                {item}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Fortest2;