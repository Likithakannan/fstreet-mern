import React, { useState,useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MyOrders() {
    const [myorders,setMyOrders] = useState({})
    const fetchMyOrder = async() =>{
        await fetch("http://localhost:5000/api/myorder", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: 
                JSON.stringify({email : localStorage.getItem('userEmail')})
        }).then(async(res)=>{
            let response = await res.json()
            await setMyOrders(response)
        })
    }

    useEffect(() => {
      fetchMyOrder() 
    }, [])
    
  return (
    <>
    <Navbar/>
    <div>
        <div className='container'>
                {myorders != {} ? Array(myorders).map(data =>{
                    return(
                    data.order_data ? data.order_data.order_data.slice(0).reverse().map((item) => {
                        return(
                        item.map((arrayData) =>{
                            return(
                                <div>
                                    {arrayData.order_date ? <div className='m-auto mt-5'>
                                    {data = arrayData.order_date}
                                    <hr/>
                                </div> : 
                                <div className='row row-cols-3'>
                                    <div className='col'>
                                    <div className='card mt-3' style = {{ width:"16rem", maxHeight:"360px"  }}>
                                        <div className='card-body'>
                                            <h5 className='card-title'>{arrayData.name}</h5>
                                            <div className='container w-100 p-0' style= {{ height:"38px"}}>
                                                <span className='m-1'>{arrayData.qty}</span>
                                                <span className='m-1'>{arrayData.size}</span>
                                                <span className='m-1'>{data}</span>
                                                <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                    ₹{arrayData.price}/-
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                        }
                        </div>
                        )})
                    )}) : ""
                )}):""}
            </div>
        </div>
    <Footer/>
    </>
  )
}
