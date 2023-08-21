import connectDb from "../../../middleware/mongoose"
import Product from "../../../models/Product"

const handler = async (req,res)=>{
    let products = await Product.find()
    
    
    res.status(200).json({tshirts})
  }

export default connectDb(handler)
  // for(let item in products){
    //   if (item.title in tshirts) {
    //     if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
    //       tshirts[item.title].color.push(item.color)
    //     }
    //     if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
    //       tshirts[item.title].size.push(item.size)
    //     }
        
    //   } else {
    //     tshirts[tshirts.title] = JSON.parse(JSON.stringify(item))
    //     if (item.availableQty > 0) {
    //       tshirts[item.title].color = [item.color]
    //       tshirts[item.title].size = [item.size]
    //     }
    //   }
    // }