

import User from "../../../models/user"
import connectDb from "../../../middleware/mongoose"
var CryptoJS = require("crypto-js");
const handler = async (req, res)=>{
    if (req.method == 'POST') {
        
        let user = await User.findOne({"email": req.body.email})
        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        let originalpass = bytes.toString(CryptoJS.enc.Utf8);
        if (user) {
            if (req.body.email == user.email && req.body.password == originalpass) {
                const jwt = require('jsonwebtoken');
                const token = jwt.sign({ email: user.email , name: user.name }, process.env.JWT_TOKEN);
                
                res.status(200).json({success : true, token , email: user.email })
                
            } else {
                res.status(200).json({success : false, error: "Wrong Credentials"})
            }
            
        } else {
            res.status(200).json({success : false, error: "No account found with this email Please signup"})
            
        }
        
    
        
    } else {
        res.status(200).json({error: "this method is not allowed"})
    }
}


export default connectDb(handler)
  