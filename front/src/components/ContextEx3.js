import { useContext, useState } from "react"
import { DarkModeContext } from "./context/DarkModeContext"
function Header(){
    let {mode, setMode} = useContext(DarkModeContext);
    return <>
        <div style={{
            padding : "50px 50px", 
            backgroundColor : mode ? "#eee" : "#2f2e2e",
            color : mode ? "black" : "white",
            height : "150px"
        }}>헤더!!
            <div><button onClick={()=>{
                setMode(!mode);
            }}>{mode ? "다크 모드" : "라이트 모드"}</button></div>
        </div>
        
    </>
}
function Body(){
    let {mode, setMode} = useContext(DarkModeContext);
    return <>
        <div style={{
            padding : "50px 50px", 
            backgroundColor : mode ? "#effbeb" : "#000000",
            color : mode ? "black" : "white",
            height : "300px"
        }}> Body!!
            <Content></Content>
        </div>
    </>
}
function Footer(){
    let {mode, setMode} = useContext(DarkModeContext);
    return <>
        <div style={{
            padding : "50px 50px", 
            backgroundColor : mode ? "#e2f1fb" : "#605454",
            color : mode ? "black" : "white",
            height : "150px"
        }}>Footer</div>
    </>
}

function Content(){
    let {mode, setMode} = useContext(DarkModeContext);
    return <>
        <div style={{
            padding : "50px 50px", 
            backgroundColor : mode ? "#ece0f6" : "#000000",
            color : mode ? "black" : "white",
            height : "150px"
        }}>Content</div>
    </>
}

function ContextEx3(){
    let [mode, setMode] = useState(true);
    return <>
        <DarkModeContext.Provider value={{mode, setMode}}>
            <Header></Header>
            <Body></Body>
            <Footer></Footer>
        </DarkModeContext.Provider>
    </>
}

export default ContextEx3;