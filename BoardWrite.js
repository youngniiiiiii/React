import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVERIP } from '../../CommonUtil';
import { Outlet, Link, NavLink, useNavigate, useParams } from "react-router-dom";

function BoardWrite(props){
    let {id} = useParams(); //보내는 쪽에서 json객체로 보냄
    let history = useNavigate();

    // const [writer, setWriter]=useState("");
    // const [title, setTitle]=useState("");
    // const [contents, setContents]=useState("");

    //변수 4개를 하나의 json객체로 저장 - 필드가 많을때 변수 하나씩 만들면 힘들다
    const [inputs, setInputs]=useState({
        title:'', writer:'', contents:'', filename:''
    })

    // useEffect(()=>{
    //     console.log("id", id);
    //     async function loadData(id){
    //         let results = await axios.get(SERVERIP+"/rest_board/view/"+id)
    //         console.log(results.data.boardData.title)
    //         console.log(results.data.boardData.writer)
    //         console.log(results.data.boardData.contents)
            

    //         setTitle(results.data.boardData.title);
    //         setWriter(results.data.boardData.writer);
    //         setContents(results.data.boardData.contents);
    //     }
    //     if( id!=undefined)  //write가 아니고 view로 호출할때 
    //         loadData(id);
    //     //window.onload 역할
    //     //BoardWrite 컴포넌트가 /board/write 일때는 undefined가 오고
    //     // /board/view/1 id에는 파라미터 값이 저장된다.
    // },[]);

    const onChange=(e)=>{
        const{value, name}
         = e.target;  //입력객체로부터 값과 이름을 가져온다
        console.log(value, name);
        setInputs({...inputs, [name]:value })    //{...input} - json객체 복사

        //위 코드를 해석하면 아래처럼 나온다.
        //let temp = input;
        //temp[name] = value;
        //setInputs(temp);
    }
    // const titleChange=(e)=>{
    //     setTitle(e.target.value);
    // }
    // const writerChange=(e)=>{
    //     setWriter(e.target.value);
    // }
    // const contentsChange=(e)=>{
    //     setContents(e.target.value);
    // }
    //서버로 전송하기
    const postData=()=>{
        //데이터를 json으로 묶어서 보내야 한다
        let frmData = new FormData();
        frmData.append("title", inputs.title);
        frmData.append("writer", inputs.writer);
        frmData.append("contents", inputs.contents);
        frmData.append("file", window.document.myform.file.files[0]);
        //파일 첨부시 자바스크립트가 파일이 여러개 첨부하는거로 처리한다.
        //그래서 무조건 배열의 형태이다.
        //document.폼이름.file태그의name속성.files[0];
        //여러개 추가할 수도 있다.


        //let data ={"title":title, "writer":writer, "contents":contents};
        axios.post(SERVERIP+"/rest_board/save", frmData)
        .then( (res)=>{
           console.log( res.data );
           history("/board/list");  //redirect에 대응
        })
        .catch( (error)=>{
            console.log( error );
        })
    }
    //json을 각개 변수로 해체(destruction)
    const {title, writer, contents, file} = inputs;

    return(     
        <div className  ='container'>
            <form name="myform" encType='multipart/form-data'>
            <h1>게시판 글쓰기</h1>
            <table className="table table-hover " style={{marginTop: "30px"}}>
            <colgroup>
                <col width="25%"/>
                <col width="*"/>
                <col width="*"/>
            </colgroup>
        
            <tbody>
             
              <tr>
                <td>제목</td>
                <td>
                    <div className="mb-3" style={{marginTop: "13px"}}>
                        <input type="text" className="form-control" 
                        value={title}
                        name="title"
                        onChange={onChange}
                        placeholder="제목을 입력하세요" />
                    </div>
                </td>
              </tr>      
              <tr>
                <td>작성자</td>
                <td>
                    <div className="mb-3" style={{marginTop: "13px"}}>
                        <input type="text" className="form-control" 
                        value={writer}
                        name="writer"
                        onChange={onChange}
                        placeholder="작성자을 입력하세요" />
                    </div>
                </td>
              </tr>
              <tr>
                <td>내용</td>
                <td>
                    <div className="mb-3" style={{marginTop: "13px"}}>
                        <input type="text" className="form-control" 
                        value={contents}
                        name="contents"
                        onChange={onChange}
                        placeholder="내용을 입력하세요" />
                    </div>
                </td>
              </tr>  
              <tr>
                <td>파일</td>
                <td>
                    <div className="mb-3" style={{marginTop: "13px"}}>
                        <input type="file" className="form-control" 
                        value={file}
                        name="file"
                        onChange={onChange}
                        placeholder="파일을 첨부하세요" />
                    </div>
                </td>
              </tr>                 
            </tbody>
          </table>
       
          <div className="container mt-3" style={{textAlign:"right"}}>
            <Link to="#" className="btn btn-secondary" onClick={postData}>등록</Link>
            <Link to="#" className="btn btn-secondary">취소</Link>
          
          </div>
          </form>
        </div>
        
    )
}

export default BoardWrite;