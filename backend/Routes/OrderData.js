const express = require('express')
const router = express.Router()
const order = require('../models/Orders')

router.post('/orderData', async(req,res)=>{
    let data = req.body.order_data
    await data.splice(0,0,{order_date : req.body.order_date})
    let eid = await order.findOne({email : req.body.email})
    if(eid === null){
        try {
            await order.create({
            email : req.body.email,
            order_data : [data]
        }).then(()=>{
            res.json({success:true})  
        })
        } catch (error) {
            res.send('Error in server',error.message)
        }
       
    }
    else{
        try {
            await order.findOneAndUpdate({email : req.body.email}, {$push:{order_data:data}}).then(()=>{res.json({success:true})})
        } catch (error) {
            res.send('Error in server',error.message)
        }
    }

})

router.post('/myorder', async(req,res) => {
    try {
        let myData = await order.findOne({email : req.body.email})
        res.json({order_data : myData})
    } catch (error) {
        res.send("Error in server", error.message)     
    }
})

module.exports=router