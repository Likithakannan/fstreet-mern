import React from 'react'
import { CartDispatch, CartState } from '../components/ContextReducer'


export default function Cart() {
    let data = CartState()
    let dispatch = CartDispatch()
    if(data.length === 0){
        return(
            <div className='m-5 text-center fs-3'>Cart is Empty!</div>
        )
    }
    let totalPrice = data.reduce((total,food) => total + food.price, 0)

    const handleCheckout = async() => {
      let userEmail = localStorage.getItem('userEmail')
      let response = await fetch("http://localhost:5000/api/orderData",{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          email : userEmail,
          order_data : data,
          order_date : new Date().toDateString()
        })
      })
      if(response.status === 200){
        dispatch({type:"DROP"})
      }
    }
    return <div>
        <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
          <table className="table table-hover">
            <thead className="text-info fs-4">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Option</th>
                <th scope="col">Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                    {data.map((food,index)=>{
                        return (
                            <tr>
                                <th>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td className='btn bg-danger text-black' onClick={() => { dispatch({type:"REMOVE", index:index })}}>Delete</td>
                            </tr>
                        )
                    })}
                    
            </tbody>
          </table>
          <div><h1 className='fs-2'>Total Price : {totalPrice}</h1></div>
          <div>
            <button className='btn bg-info mt-5' onClick={handleCheckout}>Check Out</button>
          </div>
        </div>
      </div>;
  
}
