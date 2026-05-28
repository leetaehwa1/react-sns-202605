import { useState } from "react"

function Content1(props){
    
    return<>
        <h5>Content1!!!</h5>
        <div>{props.name}</div>
        <div>{props.age}</div>
    </>
}

function Content2(){
    return<>
        <h5>Content2!!!</h5>
    </>
}

function Main(props){
    
    return<>
        <h4>메인!</h4>
        <Content1 name={props.name} age={props.age}></Content1>
        <Content2></Content2>
    </>
}
function LSide(){return<></>}
function RSide(){return<></>}

function Body (props){
    
    return<>
        <h3>Body!!!</h3>
        <LSide></LSide>
        <Main name={props.name} age={props.age}></Main>
        <RSide></RSide>
    </>
}


function ContextEx1(){
    let[name, setName] = useState("홍길동");
    let[age, setAge] = useState(30);

    return<>
        <Body name={name} age={age}></Body>
    </>
}

export default ContextEx1;