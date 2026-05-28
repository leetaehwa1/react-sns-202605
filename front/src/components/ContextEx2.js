import { useContext, useState } from "react"
import { UserContext } from "./context/UserContext"

function Content1(props){
    let user = useContext(UserContext);
    console.log("user ==> ",user);
    return<>
        <h5>Content1!!!</h5>
        <div>{user.name}, {user.age}</div>
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
        <Content1></Content1>
        <Content2></Content2>
    </>
}
function LSide(){return<></>}
function RSide(){return<></>}

function Body (props){
    
    return<>
        <h3>Body!!!</h3>
        <LSide></LSide>
        <Main></Main>
        <RSide></RSide>
    </>
} 


function ContextEx1(){
    let[name, setName] = useState("홍길동");
    let[age, setAge] = useState(30);
    //{name, age} => {name : name, age : age}

    return<>
    <UserContext.Provider value={{name, age}}>
        <Body></Body>
    </UserContext.Provider>    
    </>
}

export default ContextEx1;