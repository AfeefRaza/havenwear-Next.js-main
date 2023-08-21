


import User from "../../../models/user"
import connectDb from "../../../middleware/mongoose"
import jsonwebtoken from 'jsonwebtoken'
const handler = async (req, res)=>{
    if (req.method == 'POST') {
        
        
        let token = req.body.token
        let user = jsonwebtoken.verify(token , process.env.JWT_TOKEN)
        let dbuser = await User.findOne({email:user.email})
        const {name,email,address,pincode,number} = dbuser
        
        
    res.status(200).json({name,email,address,pincode,number})
        
    } else {
        res.status(400).json({error: "this method is not allowed"})
    }
}


export default connectDb(handler)
  