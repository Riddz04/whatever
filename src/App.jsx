import { useState ,useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const[numberAllowed,setNumberAllowed]= useState(false);
  const[charAllowed,setCharAllowed] = useState(false);
  const[password,setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str = str + "0123456789"
    if(charAllowed) str = str + "!@#$%^&*()_[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()* str.length + 1)
      pass += str.charAt(char)
      
    }
    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    //passwordRef.current?.selectionrange(0,3)//to select only upto a range
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className='w-full h-36 max-w-md mx-auto shadow-md flex flex-col justify-center rounded-lg px-5 my-8 text-orange-800 bg-gray-800'>
      <h1 className='text-white text-center align-text-top my-4 mt-0'>Password Generator</h1>
      <div className='flex shadow rounded-md overflow-hidden mb-4 align-text-bottom'>
        <input
        type='text'
        value={password}
        className='outline-none py-1 px-3 w-full'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1 text-orange-600'>
          <input 
          type="range"
          min={6}
          max={50}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
           />
           <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1 text-orange-600'>
          <input
          type='checkbox'
          defaultChecked = {numberAllowed}
          id='numberInput'
          onChange={()=>{setNumberAllowed((prev)=>!prev)}}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1 text-orange-600'>
          <input
          type='checkbox'
          defaultChecked = {charAllowed}
          id='charInput'
          onChange={()=>{setCharAllowed((prev)=>!prev)}}
          />
          <label htmlFor='charInput'>Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
