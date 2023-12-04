import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

const reducer = (state,action) => {
  switch(action.type){
    case "ADD":
      return [...state,{id:action.id,name:action.name,price:action.price,size:action.size,qty:action.qty}]
    case "REMOVE":
      let newArr = [...state]
      newArr.splice(action.index,1)
      return newArr
    case "UPDATE":
      let arr = [...state]
      arr.find((food,index) => {
        if(food.id === action.id){
          arr[index] = {...food, qty : (food.qty + parseInt(action.qty)), price : (food.price + parseInt(action.price)) }
        }
        return arr
      })  
      return arr
    case "DROP":
      let empArr = []
      return empArr
    default:
      console.log("error in reducer")  
  }
}

export const CartProvider = ({children}) =>{
    const [state,dispatch] = useReducer(reducer,[])
    return(
      <CartDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
          {children}
        </CartStateContext.Provider>
      </CartDispatchContext.Provider>
    )
}   

export const CartState = () => useContext(CartStateContext)
export const CartDispatch = () => useContext(CartDispatchContext)
