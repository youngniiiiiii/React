import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVERIP } from '../../CommonUtil';
import { Outlet, Link, NavLink, useNavigate, useParams } from "react-router-dom";

function ScoreWrite(props){
    let {ID} = useParams(); //보내는 쪽에서 json객체로 보냄
    let history = useNavigate();

    const [STUDENT_NAME, setStudentName]=useState("");
    const [KOR, setKOR]=useState("");
    const [ENG, setENG]=useState("");
    const [MAT, setMAT]=useState("");

    useEffect(()=>{
        console.log("ID", ID);
        async function loadData(ID){
            let results = await axios.get(SERVERIP+"/score/view/"+ID)
            console.log(results.data.score.STUDENT_NAME)
            console.log(results.data.score.KOR)
            console.log(results.data.score.ENG)
            console.log(results.data.score.MAT)

            setStudentName(results.data.score.STUDENT_NAME);
            setKOR(results.data.score.KOR);
            setENG(results.data.score.ENG);
            setMAT(results.data.score.MAT);
        }
        if( ID!=undefined)  //write가 아니고 view로 호출할때 
            loadData(ID);
        //window.onload 역할
        //BoardWrite 컴포넌트가 /board/write 일때는 undefined가 오고
        // /board/view/1 id에는 파라미터 값이 저장된다.
    },[]);

    const nameChange=(e)=>{
        setStudentName(e.target.value);
    }
    const korChange=(e)=>{
        setKOR(e.target.value);
    }
    const engChange=(e)=>{
        setENG(e.target.value);
    }
    const matChange=(e)=>{
        setMAT(e.target.value);
    }

    //서버로 전송하기
    const postData=()=>{
        //데이터를 json으로 묶어서 보내야 한다
        let data ={"STUDENT_NAME":STUDENT_NAME, "KOR":KOR, "ENG":ENG, "MAT":MAT};
        axios.post(SERVERIP+"/score/write", data)
        .then( (res)=>{
           console.log( res.data );
           history("/score/list");  //redirect에 대응
        })
        .catch( (error)=>{
            console.log( error );
        })
    }
    return(
        <div className  ='container'>
            <h1>성적입력</h1>
            <table className="table table-hover " style={{marginTop: "30px"}}>
            <colgroup>
                <col width="25%"/>
                <col width="*"/>
            </colgroup>
        
            <tbody>
             
              <tr>
                <td>이름</td>
                <td>
                    <div className="mb-3" style={{marginTop: "13px"}}>
                        <input type="text" className="form-control" 
                        value={STUDENT_NAME}
                        placeholder="이름을 입력하세요" onChange={nameChange}/>
                    </div>
                </td>
              </tr>      
              <tr>
                <td>국어</td>
                <td>
                    <div className="mb-3" style={{marginTop: "13px"}}>
                        <input type="text" className="form-control" 
                        value={KOR}
                        placeholder="국어성적을 입력하세요" onChange={korChange} />
                    </div>
                </td>
              </tr>          
              <tr>
                <td>영어</td>
                <td>
                    <div className="mb-3" style={{marginTop: "13px"}}>
                        <input type="text" className="form-control" 
                        value={ENG}
                        placeholder="영어성적을 입력하세요" onChange={engChange} />
                    </div>
                </td>
              </tr>          
              <tr>
                <td>수학</td>
                <td>
                    <div className="mb-3" style={{marginTop: "13px"}}>
                        <input type="text" className="form-control" 
                        value={MAT}
                        placeholder="수학성적을 입력하세요" onChange={matChange} />
                    </div>
                </td>
              </tr>          
            </tbody>
          </table>
       
          <div className="container mt-3" style={{textAlign:"right"}}>
            <Link to="#" className="btn btn-secondary" onClick={postData}>등록</Link>
            <Link to="#" className="btn btn-secondary">취소</Link>
          
          </div>
        </div>
    )
}

export default ScoreWrite;