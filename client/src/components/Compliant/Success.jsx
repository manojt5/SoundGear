import React from 'react'
import "./Success.scss"
import { useNavigate } from 'react-router-dom'
function Success() {
    const navigate=useNavigate();
  return (
    <div className='success'>
        <div>
        <div>Yor Response has been noted</div>
        <button onClick={()=>{navigate("/")}}>Continue Shopping</button>
        </div>
    </div>
  )
}

export default Success