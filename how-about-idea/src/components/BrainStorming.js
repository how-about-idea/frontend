import React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";


const PrintedWordCss = styled.div`


width:25%;
height:25%;
display:flex;
align-items:center;
justify-content:center;


`

function PrintedWord(props){

    return(

        <PrintedWordCss onClick={()=>{
            if(props.word!=="")
                props.setPrev(props.word)

        }}>

            {props.word}

        </PrintedWordCss>

    )
}


const NodeCss = styled.div`
  overflow:hidden;
  width:28%;
  border: 1px solid skyblue;
  border-radius: 12px;
  margin:1% 1.5%;
  padding:1% 1.5%;
  .wrap{
    width:200%;
    display: flex;
    transform:translate(0%);
    transition:0.5s;

    .container1,.container2{
      display: flex;
      width:50%;
      align-items: center;
      justify-content: center;
    }
    
    .container1{

      text-align:center;

    }

    .add,.cancle{
      width:50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .add{
      padding:7% 1%;
      color:#ffffff;
      background:skyblue;
    }

    .cancle{
      color:red;
      padding:5% 1%;

    }

  }




`

function Node(props){

  const menu = useRef()

  return(

    <NodeCss >
      <div className="wrap" ref={menu}>
        <div className="container1" onClick={()=>{menu.current.style.transform="translate(-50%)"}}>
          {props.word}
        </div>
        <div className="container2">
        
          <p className="cancle" 
          onClick={()=>{
            menu.current.style.transform="translate(0%)"
            //props.tool.current.innertext="단어를 선택해 주세요"
          }}>취소</p>

          <p className="add" 
          onClick={()=>{
            //props.tool.current.innerText=props.word
            menu.current.style.transform="translate(0%)"
            props.setMenu(true)
          }}>선택</p>
        
        </div>
      </div>
    </NodeCss>
  )
}


const BrainStormingCss = styled.div `

width:100vw;
height:92vh;
background:rgba(0,0,0,0.1);
display:flex;

.word_select{

    width:46vw;
    height:80vh;
    background:#ffffff;
    margin: 6vh 2vw;
    border-radius:12px;
    display:flex;
    align-items:center;
    flex-wrap:wrap;
}

.menu{

    width:46vw;
    height:80vh;
    background:#ffffff;
    margin: 6vh 2vw;
    border-radius:12px;

    .title{

        width:100%;
        height:10%;
        display:flex;

        p{
            width:50%;
            height:100%;
            display:flex;
            align-items:center;
            justify-content:center;
            transition:.5s;
        }

        .word{
            color:${props=>props.menu?"#00000077":"#000000"};
            border-bottom:1.5px solid ${props=>props.menu?"#00000077":"#000000"};
        }

        .tool{
            color: ${props=>props.menu?"#000000":"#00000077"};
            border-bottom:1.5px solid ${props=>props.menu?"#000000":"#00000077"};;
        }

    }

    .slider{

        overflow:hidden;
    }


    .container{

        width:200%;
        height:90%;
        display:flex;
        overflow:hidden;
        transform: translate(${props=>props.menu?-100:0}%);
        transition:0.5s;
        .words{

            margin: 2% 2%;
            width:96%;
            height:65vh;
            display:flex;
            overflow-y:scroll;
            flex-wrap:wrap;
            background:red;
        }   

        .tools{

            margin: 2% 2%;
            width:96%;
            height:96%;
        }

    }

}

`



function BrainStorming(){

    let json_data = {
        root: "개",
        개: ["리트리버", "푸들", "시츄", "말티즈", "웰시코기", "고양이"],
        고양이: ["브리티시 숏헤어", "러시안 블루", "페르시안"],
        리트리버: ["갈색", "대형견", "사냥"],
        푸들:["대형견","흰색", "곱슬", "영국","말티푸"],
        시츄:["소형견","똑똑함","조용함","갈색","흰색"]
    };

    const [menu,setMenu] = useState(false)
    const [word,setWord] = useState([])
    const [prev,setPrev] = useState("")
    const [select,setSelect] = useState([json_data.root])
    const [print,setPrint] = useState([])
    useEffect(()=>{

        setWord(json_data[json_data.root])

    },[])
    useEffect(()=>{
        
        if(prev!==""){

            let buf=[...word]
            for (let i =0 ; i<buf.length ;i++){

                if(buf[i]===prev){

                    buf.splice(i,1)
                    
                    if(json_data[prev]!==undefined)
                       setWord (buf.concat(json_data[prev]))
                    else
                        setWord(buf)
                    break
                }
            }

            setSelect([...select,prev])
            
        }
    },[prev])
    useEffect(()=>{

        let buf=[]
        for(let i =0;i<16;i++){

            if(word.length>buf.length){
            
                while (true){

                    const rand= Math.floor(Math.random() * word.length);
                    let flag = false;
                    for(let j=0;j<buf.length;j++ ){

                        if(buf[j]===rand){
                            flag=true
                            break;
                        }
                    }

                    if(!flag){

                        buf.push(rand)
                        break
                    }

                }
            }

            else{

                buf.push(-1)
            }
        }
        setPrint(buf)

    },[word])
    return(
        <BrainStormingCss menu={menu}>
            <div className="word_select">
                {

                    print.map((e,idx)=>{

                        return(
                            <PrintedWord word={e!==-1?word[e]:""} setPrev={setPrev} key={idx}/>
                        )
                    })



                }
            </div>
            <div className="menu">
                <div className="title">
                    <p className="word" onClick={()=>setMenu(false)}>단어</p>
                    <p className="tool" onClick={()=>setMenu(true)}>도구</p>
                </div>
                <div className="slider">
                    <div className="container">
                        <div className="words">

                            {
                                
                                select.map((e,idx)=>{

                                    return(<Node word={e} setMenu={setMenu} key={idx}/>)

                                })
                            }
                        </div>

                        <div className="tools">

                        </div>
                    </div>
                </div>
            </div>
        </BrainStormingCss>
    )

}


export default BrainStorming