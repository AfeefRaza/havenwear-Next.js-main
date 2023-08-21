


import User from "../../../models/user"
import connectDb from "../../../middleware/mongoose"
import jsonwebtoken from 'jsonwebtoken'
const handler = async (req, res)=>{
    if (req.method == 'POST') {
        
        
        let token = req.body.token
        let user = jsonwebtoken.verify(token , process.env.JWT_TOKEN)
        let dbuser = await User.findOneAndUpdate({email:user.email} , {name: req.body.name,email:req.body.email,address:req.body.address,pincode:req.body.pincode,number:req.body.number})
        
        
        
    res.status(200).json({success: true})
        
    } else {
        res.status(400).json({error: "this method is not allowed"})
    }
}


export default connectDb(handler)
  