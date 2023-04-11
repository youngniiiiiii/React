import React,{useState} from 'react';

const Score = (props) => {
    const [name, setName]= useState("");
    const [kor, setKor]= useState(0);
    const [eng, setEng]= useState(0);
    const [mat, setMat]= useState(0);
    const [result, setResult]= useState("");

    function nameChange(e){
        setName(e.target.value);
    }
    function korChange(e){
        setKor(e.target.value);
    }
    function engChange(e){
        setEng(e.target.value);
    }
    function matChange(e){
        setMat(e.target.value);
    }

 
    const resultConfirm=()=>{
        let sum=(parseInt(kor)+parseInt(eng)+parseInt(mat));
        let avg=((parseInt(kor)+parseInt(eng)+parseInt(mat))/3);
        setResult( `${name}님의 총점은 ${sum}이고, 평균은 ${avg} 입니다.`);
       
    }

    return (
        <div>
            이름: <input type="text" onChange={nameChange}/><br/>
            국어: <input type="text" onChange={korChange}/><br/>
            영어: <input type="text" onChange={engChange}/><br/>
            수학: <input type="text" onChange={matChange}/><br/>
            
            <button type="button" onClick={resultConfirm}>결과확인</button>
            <p>{result}</p>
        </div>
    );
};

export default Score;