import React, {useState} from 'react';

function Hero(props) {
    const [heroList, setHeroList]=useState
    (
        [
         {id:1, name:"홍길동", descr:"율도국 세움"},   
         {id:2, name:"이순신", descr:"임진왜란으로부터 나라를 구함"},
         {id:3, name:"세종대왕", descr:"한글창제"},
         {id:4, name:"강감찬", descr:"귀주대첩"}
        ]
    );
    const [hero, setHero]=useState({name:"", descr:""});

    const nameChange=(e)=>{
        let h = hero; //기존값 받아와서
        h.id=999;
        h.name = e.target.value;//새로바꾸고
        setHero(h); //설정
    }
    const descrChange=(e)=>{
        let h = hero;
        h.descr = e.target.value;
        setHero(h);
    }
    const goAppend=(e)=>{
        setHero({ hero });
        setHeroList( heroList.concat(hero));
        setHero({name:"",descr:""});    //새로객체만들기
    }

    return (
        <div>
            이름 : <input type="text" onChange={nameChange}></input><br/>
            업적 : <input type="text" onChange={descrChange}></input><br/>
            <button type="button" onClick={ goAppend }>추가</button>
            <br/><br/>

            <table>
            {
                heroList.map((hero, index)=>{
                    return(
                        <tr key={index}>
                            <td>{hero.id}</td>
                            <td>{hero.name}</td>
                            <td>{hero.descr}</td>
                        </tr>
                    )
                })
            }
            </table>
        </div>
    );
}

export default Hero;