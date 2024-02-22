import { useCallback, useEffect, useRef, useState } from 'react'
import "../public/sass/main.css"


function App() {
  const [lambai, setLambai] = useState(8)
  const [numberVal, setNumberVal] = useState(false)
  const [charVal, setcharVal] = useState(false)
  const [passVal, setPassVal] = useState("")



  const passGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberVal) str += "1234567890";
    if(charVal) str += "!@#$%^&*(){}:>?<[];,./"

    for(let i=0 ; i<lambai ; i++){
      const data = (Math.floor(Math.random() * str.length)) + 1;
      pass += str.charAt(data);
    }
    setPassVal(pass);
  },[lambai,numberVal,charVal,setPassVal])

  useEffect(()=>{
    passGenerator()
  },[lambai,numberVal,charVal,setPassVal])

  const passCopier = useRef(null);

  const copierFunc = () =>{
    passCopier.current?.select();
    // passCopier.current?.setSelectionRange(0,4);
    window.navigator.clipboard.writeText(passVal)
  }

  return(
    <>
      <div className='parent'>
        <h1>Password Generator</h1>
        <div className='upper'>
          <input id='passInp' type='text' value={passVal} readOnly ref={passCopier} />
          <button className='btn' onClick={copierFunc}>Copy Password</button>
        </div>
        <div className='lower'>
          <span>
            <input type='range' id='range-bar' max="100" min="6" value={lambai} 
            onChange={(e)=>{setLambai(e.target.value)}} />
            <label htmlFor='range-bar'>length : {lambai}</label>
          </span>
          <span>
            <input type='checkbox' id="numberBox" onClick={()=>setNumberVal((prev)=>!prev)} />
            <label htmlFor='numberBox'>Number</label>
          </span>
          <span>
            <input type='checkbox' id="charBox" onClick={()=>setcharVal((prev)=>!prev)} />
            <label htmlFor='charBox'>Character</label>  
          </span>

        </div>
      </div>
    </>
  )
}

export default App
