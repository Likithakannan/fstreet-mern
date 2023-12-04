import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Cart from '../screens/Cart'
import Modal from '../screens/Modal'
import { CartState } from './ContextReducer'

export default function Navbar() {
  let data = CartState()
  const [cartView,setCartView] = useState(false)
  let navigate = useNavigate()
  const logoutFunc = ()=>{
    localStorage.removeItem('authToken')
    navigate('/login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
          <div className="container-fluid">
            <Link className="navbar-brand fs-3 fw-bold Header" to="/">FSTREET</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                {localStorage.getItem('authToken')? <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/myorder">My orders</Link>
                </li> : ""}
              </ul>
              {
              localStorage.getItem('authToken') ?      
              <div className='d-flex'>         
              <div className='mx-1 btn bg-white text-success' onClick={()=>setCartView(true)} >My Cart <Badge pill bg="danger">{data.length}</Badge></div>
              {cartView ? <Modal onClose={()=>{setCartView(false)}}><Cart/></Modal> : null}
               <div className="mx-1 btn bg-white text-danger" onClick={logoutFunc} >Logout</div>
              </div> 
              : 
              <div className='d-flex'>
                <Link className="mx-1 btn bg-white text-info" to="/login">Login</Link>
                <Link className="mx-1 btn bg-white text-info" to="/creatuser">SignUp</Link>
              </div>
              }
              
            </div>
          </div>
      </nav>
    </>
    
  )
}
