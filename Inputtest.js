import React,{useState} from 'react';

//props사용하던 말던 기본매개변수로 사용하자
function Inputtest(props) {
    const [name, setName]= useState("");
    const [age, setAge]= useState(0);
    const [email, setEmail]= useState("");

    
    //람다함수- 일반함수의 경우 생성자에서 바인딩이라는 작업을 해야한다
    const nameChange= (e)=>{
        //인자가 - 발생한 이벤트에 대한 모든 정보
        console.log( e.target.value );    //키를 누른 값이 저장되어 있다
        setName( e.target.value );  //name변수 값이 바뀐다
    }
    const ageChange= (e)=>{
        setAge( e.target.value );
    }
    const emailChange= (e)=>{
        setEmail( e.target.value );
    }
    let mystyle={
        color:"white",
        backgroundColor:"blue",
        fontSize:"20pt",
        padding:"10px 5px 10px 5px"
    }
    return (
        <div>
            이름  : <input type="text" onChange={nameChange} 
            style={{color:"red", backgroundColor:"lightblue"}}/><br/>
            나이  : <input type="text" onChange={ageChange}
            style={mystyle} /><br/>
            이메일  : <input type="text" onChange={emailChange} /><br/>
            <p>{name} {age} {email}</p>
        </div>
    );
}

export default Inputtest;