import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVERIP } from '../../CommonUtil';
import { Outlet, Link, NavLink } from "react-router-dom";

function ScoreList(props) {
    const [scoreList, setScoreList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        async function loadData(){
        const url = SERVERIP + "/score/list";
        await axios.get(url)
        .then( (res)=>{
            setScoreList(res.data);
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
              <li><a className="dropdown-item" href="#">이름</a></li>
              <li><a className="dropdown-item" href="#">성적</a></li>
              <li><a className="dropdown-item" href="#">이름+성적</a></li>
            </ul>
            <input type="text" className="form-control" placeholder="Search"/>
            <button className="btn btn-secondary" type="submit">Go</button>
          </div>

        <table className="table table-hover ">
            <thead className="table-secondary">
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>국어</th>
                <th>영어</th>
                <th>수학</th>
              </tr>
            </thead>
            <tbody>

                {
                    loading===true?
                    scoreList.map( (item, index)=>{
                        return(
                            <tr key={index}>
                                <td>{item.ID}</td>
                                <td><Link to={"/score/view/"+item.ID}>{item.STUDENT_NAME}</Link></td>
                                <td>{item.KOR}</td>
                                <td>{item.ENG}</td>
                                <td>{item.MAT}</td>
                            </tr>
                        )
                    })
                    :""
                }
      
            </tbody>
          </table>
          <div>
            <Link className="btn btn-secondary" to="/score/write">성적입력</Link>
          </div>
        </div>
    </div>
    );
}

export default ScoreList;