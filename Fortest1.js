import React, { useState} from 'react';

function Fortest1(props){
    const [fruitsList] = useState(["사과","배","포도", "수박","머루"]);

const goSelect=(index)=>{
    alert(fruitsList[index]);
}
return(
    <div>
        <ul>
        {
            fruitsList.map((item, index)=>{
                return(
                    <li key ={index}>
                       <a href="#none" onClick={()=>{goSelect(index)}}>{item}</a>
                       {/* 앵커테그 스크롤 #none 막으려면 */}
                    </li>
                )
            })
        }
        </ul>
    </div>
)
}

export default Fortest1;