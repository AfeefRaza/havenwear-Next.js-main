

import Order from "../../../models/order"
import connectDb from "../../../middleware/mongoose"
import Product from "../../../models/Product"



const handler = async (req, res)=>{
    
    
    if (req.method == 'POST') {
        let order = new Order({
            email: req.body.email,
            orderId:req.body.oid,
            address:req.body.address,
            products:req.body.cart,
            amount: req.body.subtotal,
            pincode: req.body.pincode,
            number: req.body.number
        })

        let product, sumTotal=0
        let cart = req.body.cart
        if (req.body.subtotal <= 0 ) {
            res.status(200).json({success: false, "error" : "Your cart is empty! Please add something to place order", CartClear: false})
            return
        }
        for(let item in cart ){
            
            sumTotal += cart[item].price * cart[item].qty
            product = await Product.findOne({slug: item})
            
            if (product.availableQty < cart[item].qty) {
                res.status(200).json({success: false, "error" : "Some of the items in your cart are out of stock", CartClear: true})
                return
                
            }
            if (product.price != cart[item].price) {
                res.status(200).json({success: false, "error" : "stop tampering", CartClear: true})
                return
            }
    
        }
        if (typeof req.body.number !== 'string' || req.body.number.length !== 11 ) {
            res.status(200).json({success: false, "error" : "Please Enter a valid Phone Number", CartClear: false})
            return
        }
        console.log(typeof req.body.pincode)
        if ( typeof req.body.pincode !== 'string' || req.body.pincode.length !== 4 ) {
            res.status(200).json({success: false, "error" : "Please Enter a valid pincode" , CartClear: false})
            return
        }
        if (sumTotal != req.body.subtotal) {
            res.status(200).json({success: false, "error" : "stop tampering", CartClear: true})
            return
        }
        else{
        await order.save()
            console.log(order)
            let pro = order.products
        for(let slug in pro){
            console.log(pro[slug].qty)
             await Product.findOneAndUpdate({slug:slug}, {$inc: {"availableQty" : - pro[slug].qty }})
          }

        res.status(200).json({success: true, order})
    }

        // res.redirect('/receipt?id=' + await order.id, 200)
        
        
        
    
        
    } else {
        res.status(200).json({error: "this method is not allowed"})
    }
}


export default connectDb(handler)
  