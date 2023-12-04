import React, { useRef, useState, useEffect } from "react";
import { CartDispatch,CartState } from "./ContextReducer";

export default function Cards(data) {
  let state = CartState()
  let dispatch = CartDispatch()
  let options = data.info.options[0]
  let sizeDisp = Object.keys(options)
  let priceRef = useRef()
  const [size,setSize] = useState("")
  const [qty,setQty] = useState(1)
  let finalPrice = qty * parseInt(options[size])

  const handleAddToCart = async () =>{
    let food = []
    for(const item of state){
      if(item.id === data.info._id)
        food = item
      break
    }

    if(food != []){
      if(food.size === size){
        await dispatch({type:"UPDATE", id: data.info._id, price: finalPrice, qty: qty})
        return
      }
      else if(food.size != size){
        await dispatch({type:"ADD", id:data.info._id, name:data.info.name, img:data.info.img, price:finalPrice, size:size, qty:qty})
        return
      }
      return
    }
    await dispatch({type:"ADD", id:data.info._id, name:data.info.name, img:data.info.img, price:finalPrice, size:size, qty:qty})
    //console.log(state)
  }
  useEffect(() => {
      setSize(priceRef.current.value)
  }, [])
  

  return <div className="card m-3" style={{ width: "18rem", maxHeight: "400px", padding: "1px" }}>
      <img src={data.info.img} className="card-img-top" alt="..." style={{ height: "150px" }} />
      <div className="card-body">
        <h5 className="card-title">
          {data.info.name}
        </h5>
        <p className="card-text fs-6">
          {data.info.description}
        </p>
        <div className="container w-100">
          <select className="rounded bg-info" onChange={e => {
              setQty(e.target.value);
            }}>
            {Array.from(Array(6), (e, i) => {
              return <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>;
            })}
          </select>
          <select className="m-2 rounded bg-info" ref={priceRef} onChange={e => {
              setSize(e.target.value);
            }}>
            {sizeDisp.map(data => {
              return <option key={data} value={data}>
                  {data}
                </option>;
            })}
          </select>
          <div className="d-inline fs-8">Rs:{finalPrice}/-</div>
          <div className="btn bg-info text-white m-1 rounded" onClick={handleAddToCart}>
            Add To Cart
          </div>
        </div>
      </div>
    </div>;
}
