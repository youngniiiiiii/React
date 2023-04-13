import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVERIP } from '../../CommonUtil';
import { Outlet, Link, NavLink } from "react-router-dom";

function BoardList(props) {
    const [boardList, setBoardList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        async function loadData(){
        const url = SERVERIP + "/hero/list";
        await axios.get(url)
        .then( (res)=>{
            setBoardList(res.data);
            setLoading(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    loadData();
    }, [])

    return (
        <div>          
            <div className="container" style={{marginTop:"80px"}}>
            <h1>게시판 목록</h1>

            <div className="input-group mb-3" style={{marginTop:"20px"}}>
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                선택하세요
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">제목</a></li>
              <li><a className="dropdown-item" href="#">내용</a></li>
              <li><a className="dropdown-item" href="#">제목+내용</a></li>
            </ul>
            <input type="text" className="form-control" placeholder="Search"/>
            <button className="btn btn-secondary" type="submit">Go</button>
          </div>

        <table className="table table-hover ">
            <thead className="table-secondary">
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>업적</th>
              </tr>
            </thead>
            <tbody>

                {
                    loading===true?
                    boardList.map( (item, index)=>{
                        return(
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td><Link to={"/board/view/"+item.id}>{item.hero_name}</Link></td>
                                <td>{item.hero_desc}</td>
                            </tr>
                        )
                    })
                    :""
                }
      
            </tbody>
          </table>
          <div>
            <Link className="btn btn-secondary" to="/board/write">글쓰기</Link>
          </div>
        </div>
    </div>
    );
}

export default BoardList;